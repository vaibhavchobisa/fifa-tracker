import { useState, useEffect, createContext } from "react";
import LeagueService from "../services/LeagueService";


export const AppContext = createContext({
    apiVersion: '',
    setApiVersion: () => { },
    match: {},
    setMatch: () => { },
    leaderboard: [],
    setLeaderboard: () => { },
    screenWidth: window.innerWidth,
    setScreenWidth: () => { },
});

export const AppProvider = ({ children }) => {
    const [apiVersion, setApiVersion] = useState('');
    const [match, setMatch] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const runService = async () => {
            const newService = new LeagueService();
            const getAllData = await newService.fetchData();

            newService.setMatches(getAllData[1]);
            const matches = newService.getMatches();

            setMatch(matches);
            setApiVersion(getAllData[0]);

            const b = newService.getLeaderboard();

            setLeaderboard(b);
        }

        runService();
    },
        [])


    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));

        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        };
    }, [screenWidth]);


    const value = { apiVersion, match, leaderboard, screenWidth };
    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}