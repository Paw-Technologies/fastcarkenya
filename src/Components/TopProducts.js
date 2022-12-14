import React, { useEffect } from 'react'
import ShowProduct from './ShowProduct'
// import Cookies from 'universal-cookie'
// import api2 from '../apis/api2'
import { useSelector } from 'react-redux'
import HomeLoadBanner from './HomeLoadBanner'
import ShowApparel from './ShowApparel'

const TopProducts = (props) => {
  const products = useSelector(state=>state.clientSlice.globalProducts)

  useEffect(()=>{
    
  }, [products])
  
  const isProduct = elem => !elem.includes("GARAGES") && !elem.includes("WRAP SHOPS") && !elem.includes("PAINT/BODY SHOPS")

//   const isPerforCar = elem => elem === "PERFOMANCE CARS"
  return (
    <div className='category' style={{
      paddingBottom: '0%'
    }} >
      {products.length < 1 && <HomeLoadBanner />}

      {products.map(prod=>{
      if (isProduct(prod.category)){
        if(prod.category === 'APPAREL') return <ShowApparel 
            key={prod._id}
            product={prod}
        />
        return <ShowProduct 
            key={prod._id}
            product={prod}
        />}
      } )
    }
    </div>
  )
}

export default TopProducts
