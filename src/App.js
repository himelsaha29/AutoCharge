import './App.css';
import EVChargers from './components/EVChargers';
import Landing from './components/Landing';
import { Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (

    <Router>
      <Route path="/" exact component={Landing}/>
      <Route path="/chargermap" exact component={EVChargers}/>
    </Router>
    
    // <EVChargers/>
  );
}

export default App;
