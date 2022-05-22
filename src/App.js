import './App.css';
import Welcome from './components/Welcome';
import EVChargers from './components/EVChargers';
import Particles from './components/Particles';

function App() {
  return (
    <div >
      <Particles />
      <div className='main-header'>
        <Welcome/>
      </div>
    </div>
  );
}

export default App;
