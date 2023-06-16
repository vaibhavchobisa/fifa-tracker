import axios from "axios";

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 */
class LeagueService {    
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    

    constructor() {
    this.matches = [];
}

    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {

        // getting all teams in a teams array
        let teams = [];

        this.matches.forEach(obj => {
            if(!teams.includes(obj.homeTeam)) {
                teams.push(obj.homeTeam);
            }
            if(!teams.includes(obj.awayTeam)) {
                teams.push(obj.awayTeam);
            }
        })


        let leaderboard = [];

        teams.forEach(item => {
            const a = {};

            a['teamName'] = item;

            let matchesPlayed = 0;
            let goalsFor = 0;
            let goalsAgainst = 0;
            let points = 0;

            this.matches.forEach(obj => {
                if(item === obj.homeTeam && obj.matchPlayed) {
                    matchesPlayed++;
                    goalsFor = goalsFor + obj.homeTeamScore;
                    goalsAgainst = goalsAgainst + obj.awayTeamScore;
                    if(obj.homeTeamScore>obj.awayTeamScore) points = points + 3;
                    else if (obj.homeTeamScore===obj.awayTeamScore) points = points + 1;
                }

                else if(item === obj.awayTeam && obj.matchPlayed) {
                    matchesPlayed++;
                    goalsFor = goalsFor + obj.awayTeamScore;
                    goalsAgainst = goalsAgainst + obj.homeTeamScore;
                    if(obj.awayTeamScore>obj.homeTeamScore) points = points + 3;
                    else if (obj.homeTeamScore===obj.awayTeamScore) points = points + 1;
                }
            });

            a['matchesPlayed'] = matchesPlayed;
            a['goalsFor'] = goalsFor;
            a['goalsAgainst'] = goalsAgainst;
            a['points'] = points;

            leaderboard.push(a);
        });

        leaderboard.sort(function(a,b) {return b.points - a.points});


        // when points between 2 teams are equal
        for(let i=0; i < leaderboard.length; i++) {
            if(i+1 === leaderboard.length) break;
            if(leaderboard[i].points === leaderboard[i+1].points) {
                let pointsA = 0;
                let pointsB = 0;
                const A = leaderboard[i];
                const B = leaderboard[i+1];

                this.matches.forEach(obj => {
                    if(leaderboard[i].teamName === obj.homeTeam && leaderboard[i+1].teamName === obj.awayTeam) {
                        if(obj.homeTeamScore>obj.awayTeamScore) pointsA = pointsA + 3;
                        else if (obj.homeTeamScore<obj.awayTeamScore) pointsB = pointsB + 3;
                        else {
                            pointsA = pointsA + 1;
                            pointsB = pointsB + 1;
                        };
                    }
                    else if (leaderboard[i+1].teamName === obj.homeTeam && leaderboard[i].teamName === obj.awayTeam) {
                        if(obj.homeTeamScore<obj.awayTeamScore) pointsA = pointsA + 3;
                        else if (obj.homeTeamScore>obj.awayTeamScore) pointsB = pointsB + 3;
                        else {
                            pointsA = pointsA + 1;
                            pointsB = pointsB + 1;
                        };
                    }
                })

                if (pointsB > pointsA) {
                    leaderboard[i] = B;
                    leaderboard[i+1] = A;
                }
                else if (pointsB === pointsA) {
                    const diffA = leaderboard[i].goalsFor - leaderboard[i].goalsAgainst;
                    const diffB = leaderboard[i+1].goalsFor - leaderboard[i+1].goalsAgainst;
                    if(diffB-diffA > 0) {
                        leaderboard[i] = B;
                        leaderboard[i+1] = A;
                    }
                    else if(diffB === diffA) {
                        if(leaderboard[i+1].goalsFor - leaderboard[i].goalsFor > 0) {
                            leaderboard[i] = B;
                            leaderboard[i+1] = A;
                        }
                        else if(leaderboard[i+1].goalsFor === leaderboard[i].goalsFor) {
                            const nameA = leaderboard[i].teamName;
                            const nameB = leaderboard[i+1].teamName;

                            if(nameB>nameA) {
                                leaderboard[i] = B;
                                leaderboard[i+1] = A;
                            }
                        }
                    }
                }
            }
        }

        return leaderboard;
    }
    
    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        try {
        const getApiVersion = 'http://localhost:3001/api/version';
        const apiVersionReq = await axios.get(getApiVersion);
        const apiVersion = apiVersionReq.data.version;


        const getAccessToken = 'http://localhost:3001/api/v1/getAccessToken';
        const accessTokenReq = await axios.get(getAccessToken);
        const accessToken = accessTokenReq.data.access_token;


        const getAllMatches = 'http://localhost:3001/api/v1/getAllMatches';
        const config = {headers: {Authorization: `Bearer ${accessToken}`}}
        const allMatchesReq = await axios.get(getAllMatches, config);
        const allMatches = allMatchesReq.data.matches;

        const data = [apiVersion, allMatches]

        return data;

        } catch (e) {
            console.log("Error! Details->", e);
        }
    }    
}

export default LeagueService;