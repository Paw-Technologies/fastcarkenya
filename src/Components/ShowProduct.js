import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ShowProduct = (props) => {
  const navigate = useNavigate()
  let product = props.product;
  
  const Tag = (lbl, txt) => <p><b>{lbl}: </b>{txt}</p>
  return (
    <div className='showProduct' onClick={()=>{
      navigate('/product', {state: {product: props.product}})
    }}>
      <img src={product.images[0]} alt="product" />
      <div className='description'>
        <h2>KSh.{product.price}</h2>
        <h3>{product.brandName}</h3>
        <h4>Model: {product.model}</h4>
        {/* <p className='desc'>{product.description}</p>
        <div className='tags'>
          <p><b>year: </b>{product.year}</p>

          {product.category.includes("CARS") && <>
            {Tag('Engine Size', product.engineSize+"cc")}
            {Tag('Mileage', product.mileage+"Km")}
          </>}
        
          {product.category.includes("PARTS") && <>
            {Tag("")}
          </>}
          <p><b>Status: </b>{product.used ? "Used" : "Brand New "}</p>
          {product.category.includes("WHEELS") && <>
            {Tag("ET", product.ET)}            
            {Tag("CB", product.cb)}
            {Tag("PCD",product.pcd)}
          </>}

          {(product.category.includes("TYRES") ||
            product.category.includes("WHEELS")
          )&& <>
            {Tag("Size", product.size)}
          </>}
        </div> */}

      </div>
    </div>
  )
}

export default ShowProduct
