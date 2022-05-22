import * as React from 'react';
import './Welcome.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@mui/material';
import { Buttons } from './';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

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
        fontSize: '80%',
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


    return (
        <header className="main-header">
            <div className='inner'>

                <div className='text_container'>
                    <p className='text'>Find <span className='green'> eVe</span>ry <br></br> <em><u>charger</u> </em> near you </p>
                </div>

                <div className={classes.container}>
                    <Button className={`${classes.btn} ${classes.btn1}`} >Get Started</Button>
                </div>
                
            </div>
        </header>

    );
}

export default Welcome;