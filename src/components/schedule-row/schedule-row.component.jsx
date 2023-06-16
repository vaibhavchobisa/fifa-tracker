import './schedule-row.styles.css';

const ScheduleRow = (props) => {
    const { timestamp, stadium, homeT, awayT, played, homeScore, awayScore } = props;

    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let formattedDate = `${day}.${month}.${year}`;


    const hours = date.getHours();
    const minutes = date.getMinutes();
    let formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return (
        <tr className="sch-row">
            <td>{formattedDate}<br />{formattedTime}</td>
            <td>{stadium}</td>
            <td><span className='home'>{homeT} <img src={`https://flagsapi.codeaid.io/${homeT}.png`} alt="home-flag" /></span></td>
            <td>{played ? `${homeScore} : ${awayScore}` : 'Pending.'}</td>
            <td><span className='away'><img src={`https://flagsapi.codeaid.io/${awayT}.png`} alt="away-flag" />{awayT}</span></td>
        </tr>
    )
}

export default ScheduleRow;
