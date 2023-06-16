import './schedule.styles.css';

import { useContext } from "react";
import { AppContext } from "../../context/app.context";

import ScheduleRow from "../../components/schedule-row/schedule-row.component";

const Schedule = () => {
    const { match } = useContext(AppContext);

    return (
        <div className="schedule">
            <div className='sch-container'>
                <h1>League Schedule</h1>
                <table className="sch-table">
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>Stadium</th>
                            <th>Home Team</th>
                            <th></th>
                            <th>Away Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {match && match.map((obj, index) => {
                            const key = `obj_${index}`;
                            return (
                                <ScheduleRow
                                    key={key}
                                    timestamp={obj.matchDate}
                                    stadium={obj.stadium}
                                    homeT={obj.homeTeam}
                                    awayT={obj.awayTeam}
                                    played={obj.matchPlayed}
                                    homeScore={obj.homeTeamScore}
                                    awayScore={obj.awayTeamScore}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Schedule;