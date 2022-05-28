import * as React from 'react';
import './Welcome.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';




const useStyles = makeStyles({
    container: {
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'left',


    },
    btn: {
        border: 'none',
        paddingLeft: 25.2,
        paddingRight: 25.2,
        paddingTop: 7,
        paddingBottom: 7,
        cursor: 'pointer',
        textTransform: "none",
        color: '#fff',
        backgroundSize: '200%',
        pointerEvents: 'auto',
        fontSize: '1.31vmax',
        fontFamily: "Outfit",
        transition: '0.4s',
        '&:hover': {
            backgroundPosition: 'right'
        }
    },
    btn1: {
        backgroundImage: 'linear-gradient(45deg, #134911, #15b436, #2483bd)',
        pointerEvents: 'auto',
    }
})

function Welcome() {

    const classes = useStyles();

    const history = useHistory();

    const goToMap = () => {
        history.push("/EVChargers");
    }
  

    return (
        <header className="main-header">

            <div className='inner'>
                <p className='header'>AUTO<em>CHARGE</em></p>
                <div className='textnbtn'>
                    <div className='text_container'>
                        <p className='text'>Find<span className='green'> eVe</span>ry <br></br> <em><u>charger</u> </em> near you </p>
                    </div>
                    <div className='btn'>
                        <Button className={`${classes.btn} ${classes.btn1}`} onClick={goToMap}>Get Started</Button>
                    </div>
                </div>
            </div>


        </header>

    );
}

export default Welcome;