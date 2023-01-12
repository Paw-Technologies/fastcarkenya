import React from 'react'
import Spinner from  './Spinner'
import logo from '../images/logoTP.png'

const HomeLoadBanner = (props) => {


    const style = {
        width: "100%",
        height: "30vh",
        // backgroundColor: "rgb(151, 151, 151)"
    }
    const img = {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    }
    const text = {
        position: "absolute",
        top: "calc((100% - 22px)/2)",
        fontWeight: "lighter",
        left: "20%",

    }
    
  return (
    <div className='homeLoaderBanner' style={style}>
        {/* <img style={img} src={props.loader} alt='loading' /> */}
        {/* <h1 style={text}>{props.txt}</h1> */}
        {/* <Spinner /> */}
        <img style={img} src={logo} alt='logo' />
    </div>
  )
}

export default HomeLoadBanner