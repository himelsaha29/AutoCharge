import * as React from 'react';
import EVChargers from './components/EVChargers';
import Modal from './components/Modal';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { CssBaseline } from '@mui/material';
import { Buttons } from './components';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
})











// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

// export default function App() {
//   const classes = useStyles();
//   return <Button className={classes.root}>Hook</Button>;
// }

function App() {
  return (
    <EVChargers/>


    // <MuiThemeProvider theme={theme}>
    //   <CssBaseline>
    //     <Buttons />
    //   </CssBaseline>
    // </MuiThemeProvider>



  );
}

export default App;
