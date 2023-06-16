import './leaderboard.styles.css';

import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import LeaderboardRow from '../../components/leaderboard-row/leaderboard-row.component';

const Leaderboard = () => {
    const { leaderboard, screenWidth } = useContext(AppContext);

    return (
        <div className="leaderboard">
            <div className='ld-container'>
                <h1>League Standings</h1>
                <table className="ld-table">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>MP</th>
                            {
                                screenWidth <= 500 ?
                                    <th>GD</th>
                                    :
                                    <>
                                        <th>GF</th>
                                        <th>GA</th>
                                    </>
                            }
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard && leaderboard.map((obj, index) => {
                            const key = `obj_${index}`;
                            return (
                                <LeaderboardRow
                                    key={key}
                                    teamName={obj.teamName}
                                    mp={obj.matchesPlayed}
                                    gf={obj.goalsFor}
                                    ga={obj.goalsAgainst}
                                    points={obj.points}
                                    screenWidth={screenWidth}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leaderboard;