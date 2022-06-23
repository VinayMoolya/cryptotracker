import React from 'react'
import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles(()=>({
  title: {
     flex: "1",
     color:"Gold",
     fontFamily: "Monsterrat",
     fontWeight: "bold",
     cursor:"pointer",
     fontSize:"25px",
  },
}))

const Header = () => {
  
  const classes = useStyles();

  const darkTheme = createTheme({
    palette:{
      primary:{
        main:"#14161a",
      },
      type:"dark"
    },
  })

  const {currency,setCurrency} = CryptoState();
  console.log(currency)
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color ='default' position='static'>
      <Container>
        <Toolbar>
          <Typography className={classes.title}>CryptoHunter Finance Tracker</Typography>
          <Select variant='outlined'
            style={{
              width:100,
              height:40,
              marginLeft:15
            }}
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header