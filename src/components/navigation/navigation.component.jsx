import './navigation.styles.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className='nav'>
            <div className='nav-container'>
                <svg>
                    <image href="/Images/logo.svg" alt="main-logo" />
                </svg>
                <div className='nav-btns'>
                    <Link to='/schedule'>
                        <img src="./Images/schedule.png" alt="schedule-logo" />
                        Schedule
                    </Link>
                    <Link to='/leaderboard'>
                        <img src="./Images/leaderboard.png" alt="leaderboard-logo" />
                        Leaderboard
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;