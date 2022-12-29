import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/scalelogo.png'

const CompanyIcon = () => {
    const navigate = useNavigate()
  return (
    <div className='companyTitle'>
      {/* <img src={logo} alt="logo" /> */}
      <h1 onClick={()=>navigate("/")}>FASTCAR</h1>
    </div>
    
  )
}

export default CompanyIcon
