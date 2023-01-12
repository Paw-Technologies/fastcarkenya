import React, { useState } from 'react'
import './comp.css'
import { useLocation, useNavigate } from 'react-router-dom'

const MobileSearchBar = () => {
    const lokeshen = useLocation()
    const navigate = useNavigate()
    const [searchTerm, setTerm] = useState("")

  if(window.innerWidth < 600 && !lokeshen.pathname.includes('category'))return (
    <div className='mobileSearchBar' > 
        <input className='input1'
            placeholder='Search'
            value={searchTerm}
            onChange={e=>setTerm(e.target.value)}
        />
        <button onClick={
            ()=>navigate('/search', {state: {searchTerm: searchTerm}})
        }>Search</button>
    </div>
  )
}

export default MobileSearchBar
