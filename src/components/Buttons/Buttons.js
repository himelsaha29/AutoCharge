import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
        marginTop: 20,
        marginBottom: -4,
        borderRadius: 6,
        cursor: 'pointer',
        color: '#fff',
        backgroundSize: '200%',
        fontSize: '1.0vw',
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

export default function Buttons(props) {
    const classes = useStyles();
    return (


        <div className={classes.container}>
            <Button className={`${classes.btn} ${classes.btn1}`} onClick={props.onClick}>{props.btn}</Button>
        </div>


    )
}