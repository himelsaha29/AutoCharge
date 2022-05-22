import './App.css';
import Welcome from './components/Welcome';
import EVChargers from './components/EVChargers';
import Particles from './components/Particles';

function App() {
  return (
    <div className='App-header'>
      <Particles />
      <div className='outer'>
        <Welcome/>
      </div>
    </div>
  );
}

export default App;
