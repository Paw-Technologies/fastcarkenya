import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShowApparel = ({product}) => {
    const navigate = useNavigate()
  return (
    <div className='showProduct' onClick={()=>{
        navigate('/product', {state: {product: product}})
      }}>
        <img src={product.images[0]} alt="apparel" />
        <div className='description'>
            <h2>KSh.{product.price}</h2>
            <h1>{product.type}</h1>
        </div>
    </div>
  )
}

export default ShowApparel