import './leaderboard-row.styles.css';

const LeaderboardRow = (props) => {

    const { teamName, mp, gf, ga, points, screenWidth } = props;

    const gd = gf - ga;

    return (
        <tr className="ld-row">
            <td><span><img src={`https://flagsapi.codeaid.io/${teamName}.png`} alt="" />{teamName}</span></td>
            <td>{mp}</td>
            {
                screenWidth <= 500 ?
                    <td>
                        {gd}
                    </td>
                    :
                    <>
                        <td>{gf}</td>
                        <td>{ga}</td>
                    </>
            }
            <td>{points}</td>
        </tr>
    )
}

export default LeaderboardRow;
