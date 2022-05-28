import './App.css';
import EVChargers from './components/EVChargers';
import Landing from './components/Landing';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeAnalytics } from './components/firebase-config';
import ReactGA from 'react-ga';

function App() {


  const analytics = initializeAnalytics;
  logEvent(analytics, 'Home');

  const { id } = require('./components/firebase-config.js');

  useEffect(() => {
    ReactGA.initialize(id);
    ReactGA.pageview(window.location.pathname + window.location.search);

  }, []);

  return (

    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/EVChargers" exact component={EVChargers} />
    </Router>

    // <EVChargers/>
  );
}

export default App;
