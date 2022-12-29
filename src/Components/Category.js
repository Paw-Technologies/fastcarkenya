import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './comp.css'

const Category = (props) => {
  const navigate = useNavigate()
    const [size, setSize] = useState({w: "0", h: "0"})
    
    useEffect(()=>{
      if(window.innerWidth > 600){
        setSize(p=>({...p, w: "12em", h: "12em"}))
      }
      if(window.innerWidth < 600){
        setSize(p=>({...p, w: '100px', h: "150px"}))
      }
    }, [])

  return (
    <div className='categoryIcons' style={{
          width: `${size.w}`,
          height: `${size.h}`
      }}
      onClick={()=>navigate("/category", {state: {category: props.name}})}
    >
      <img src={props.icon} alt="icon" />
      <p>{props.name}</p>
    </div>
  )
}

export default Category
