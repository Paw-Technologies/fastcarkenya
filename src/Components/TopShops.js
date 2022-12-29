import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import ShowService from './ShowService'
import walk from '../images/walking.gif'
import HomeLoadBanner from './HomeLoadBanner'

const TopShops = () => {
    const cookie = new Cookies()
    const dispatch = useDispatch()
    const [timeOut] = useState()
    const services = useSelector(state=>state.clientSlice.globalProducts)

    
    const isProduct = elem => elem.includes("GARAGES") || elem.includes("WRAP SHOPS") || elem.includes("PAINT/BODY SHOPS")
    
    return (
      <div className='category' style={{
        paddingBottom: '0%'
      }} >
        {services.length < 1 && <HomeLoadBanner loader={walk} txt="At your service in a few..." />}

        {services.map(prod=>{
        if(isProduct(prod.category)) return <ShowService 
          key={prod._id}
          service={prod}
        />})
      }
      </div>
    )
}

export default TopShops