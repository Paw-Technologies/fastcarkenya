import React from 'react'
import './comp.css'
import { FaSearch } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const MobileSearchBar = () => {
    const lokeshen = useLocation()

  if(window.innerWidth < 600 && !lokeshen.pathname.includes('category'))return (
    <div className='mobileSearchBar' >
        <input className='input1'
            placeholder='Search'
        />
        <button>Search</button>
    </div>
  )
}

export default MobileSearchBar
