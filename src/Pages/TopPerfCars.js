import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import HomeLoadBanner from '../Components/HomeLoadBanner'
import ShowProduct from '../Components/ShowProduct'

const TopPerfCars = () => {
    const products = useSelector(state=>state.clientSlice.globalProducts)

    useEffect(()=>{
      
    }, [products])
    
    const isPerfCar = elem => elem === "PERFORMANCE CARS"
    return (
      <div className='category' style={{
        paddingBottom: '0%'
      }} >
        {products.length < 1 && <HomeLoadBanner />}

        {products.map(prod=>{
        if (isPerfCar(prod.category)){
          return <ShowProduct 
              key={prod._id}
              product={prod}
          />}
        } )
      }
      </div>
    )
}

export default TopPerfCars