import '../App.css';
import Welcome from './Welcome';
import Particles from './Particles';

function Landing() {
    return (

        <div className='App-header'>
            <Particles />
            <div >
                <Welcome />
            </div>
        </div>
    );
}

export default Landing;
