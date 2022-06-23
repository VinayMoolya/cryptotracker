import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'
const useStyles = makeStyles(()=>({
    Banner:{
        backgroundImage : "url(./Banner.jpg)",

    },
    BannerContent:{
        height:400,
        display: "flex",
        flexDirection: 'column',
        paddingTop:25,
        justifyContent:"space-around",

    },
    tagline:{
        display:"flex",
        flexDirection:"column",
        height:"40%",
        justifyContent:'center',
        alignItems:'center',
    },
}))

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.Banner}>
        <Container className={classes.BannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:'Monsterrat',
                }}>
                CryptoHunter Finance Tracker
                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:'Monsterrat',
                    textAlign:'center',
                    fontSize:18,
                    color:'whitesmoke',
                    textTransform:'capitalize'
                }}>
                Get all the info regarding your favorite Crypto Currencies !!!
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner