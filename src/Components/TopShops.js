import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import ShowService from './ShowService'
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
        {services.filter(p=>isProduct(p.category)).length < 1 && <HomeLoadBanner txt="At your service in a few..." />}

        {services.filter(p=>isProduct(p.category)).map(prod=><ShowService 
          key={prod._id}
          service={prod}
        />)
      }
      </div>
    )
}

export default TopShops