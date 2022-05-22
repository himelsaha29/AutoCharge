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
        textAlign: 'center',

    },
    btn: {
        border: 'none',
        paddingLeft: "4.2vh",
        paddingRight: "4.2vh",
        paddingTop: 7,
        paddingBottom: 7,
        cursor: 'pointer',
        color: '#fff',
        backgroundSize: '200%',
        fontSize: '80%',
        fontFamily: "Outfit",
        transition: '0.4s',
        '&:hover': {
            backgroundPosition: 'right'
        }
    },
    btn1: {
        backgroundImage: 'linear-gradient(45deg, #134911, #15b436, #2483bd)'
    }
})

function Welcome() {

    const classes = useStyles();
    

    return (
        <div className="main">
            <header className="main-header">
                <div className='inner'>
                    <div className={classes.container}>
                        <Button className={`${classes.btn} ${classes.btn1}`} >get started</Button>
                    </div>
                </div>
            </header>
        </div>

    );
}

export default Welcome;