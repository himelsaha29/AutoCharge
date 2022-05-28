import '../App.css';
import Welcome from './Welcome';
import Particles from './Particles';
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeAnalytics } from './firebase-config';

function Landing() {

    document.title = "AutoCharge - Home";

    const analytics = initializeAnalytics;
    logEvent(analytics, 'Home');

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
