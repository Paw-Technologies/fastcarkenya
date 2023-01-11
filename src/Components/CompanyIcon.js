import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/scalelogo.png'

const CompanyIcon = () => {
    const navigate = useNavigate()
  return (
    <div className='companyTitle' onClick={()=>navigate("/")}>
        <span>
            <h1>FASTCAR</h1><p>.co.ke</p>
        </span>
        <p>Automotive Marketing</p>
    </div>
    
  )
}

export default CompanyIcon
