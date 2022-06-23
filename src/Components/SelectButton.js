import { makeStyles } from '@material-ui/core';
import React from 'react'


const useStyles=makeStyles({
    selbutton:{
        border:'2px solid gold',
        borderRadius: 5,
        padding:5,
        paddingLeft:45,
        paddingRight:45,
        cursor:'pointer',
        // backgroundColor: selected ? "gold" :"",
        // color: selected?"black":"",
        // fontWeight: selected? 700 : 500,
        // "&:hover":{
        //     backgroundColor:'gold',
        //     color:'black'
        // },
        // width:"22%",
    },
});
const SelectButton = ({children,selected,onClick}) => {
    
    
    const classes=useStyles();
  return (
    <div>
        <span onClick={onClick} className={classes.selbutton}>{children}</span>
    </div>
  )
}

export default SelectButton