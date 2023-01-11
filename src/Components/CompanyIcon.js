import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/scalelogo.png'

const CompanyIcon = () => {
    const navigate = useNavigate()
    const style = {
        height: window.innerWidth < 600 ? "5vmax" : "3vmax"
    }
  return (
    <div style={style} className='companyTitle' onClick={()=>navigate("/")}>
        <span>
            <h1>FASTCAR</h1><p>.CO.KE</p>
        </span>
        <p>AUTOMOBILE MARKETING</p>
    </div>
    
  )
}

export default CompanyIcon
