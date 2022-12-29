import React, { useEffect, useMemo, useState } from 'react'
import ShowProduct from './ShowProduct'
import Cookies from 'universal-cookie'
import api2 from '../apis/api2'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_global_products } from '../Store.js/store'
import HomeLoadBanner from './HomeLoadBanner'
const TopProducts = () => {
  const cookie = new Cookies()
  const dispatch = useDispatch()
  const [timeOut] = useState()
  const products = useSelector(state=>state.clientSlice.globalProducts)

  useEffect(()=>{
    
  }, [products])
  
  const isProduct = elem => !elem.includes("GARAGES") && !elem.includes("WRAP SHOPS") && !elem.includes("PAINT/BODY SHOPS")

  return (
    <div className='category' style={{
      paddingBottom: '0%'
    }} >
      {products.length < 1 && <HomeLoadBanner />}

      {products.map(prod=>{
      if (isProduct(prod.category)) return <ShowProduct 
        key={prod._id}
        product={prod}
      />})
    }
    </div>
  )
}

export default TopProducts
