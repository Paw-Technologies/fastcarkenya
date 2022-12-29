import React from 'react'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const ShowService = (props) => {
    let rating = ['⭐', '⭐', '⭐', '⭐', '⭐']
    const service = props.service
    const navigate = useNavigate()
    
  return (
    <div className='showProduct' onClick={
        ()=>navigate('/product', {state: {product: props.service}})
    }>
        <img src={service.images[0]} alt="service avi" />
        <div className='description'>
            <span>
              <h3>{service.name} ({rating.slice(0, 3)})</h3>  
            </span>
            <h3>Location: {service.location}</h3>
            <p>{service.description}</p>
        </div>
    </div>
  )
}

export default ShowService