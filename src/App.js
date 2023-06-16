import './App.module.css';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/navigation/navigation.component';
import Schedule from './routes/schedule/schedule.route';
import Leaderboard from './routes/leaderboard/leaderboard.route';
import Error404 from './routes/error404/error404.route';
import Footer from './components/footer/footer.component';

function App() {

  return (
    <>
      <div className='header'>
        <Navigation />
      </div>
      <div className='main'>
        <Switch>
          <Route exact path='/' component={Schedule} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/*' component={Error404} />
        </Switch>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
