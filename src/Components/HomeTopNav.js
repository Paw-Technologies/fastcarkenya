import React from 'react'
import MainNav from './MainNav'
import navImg from '../images/naVW.png'
import './comp.css'

const HomeTopNav = () => {
  return (
    <div className='homeTopNav'>
        <div className='banner'>
            <img src={navImg} alt="vw" />
            <h1>GET THE BEST DEALS FOR YOUR CAR</h1>
        </div>
    </div>
  )
}

export default HomeTopNav
