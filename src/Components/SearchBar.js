import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { set_term } from '../Store.js/store'

const SearchBar = (props) => {
  const navigate = useNavigate()
  const [width, setWidth] = useState(window.innerWidth)
  const [searchTerm, setSearchTerm] = useState("")

  window.addEventListener('resize', ()=>{
    setWidth(window.innerWidth)
  })
  

  if(width >= 600)return (
    <div className='searchBar'>
        <input placeholder='Search' value={searchTerm} 
          onChange={e=>setSearchTerm(e.target.value)}
        />
        <button className='filterBtn' 
          onClick={()=>navigate('/search', {state: {searchTerm: searchTerm}})}
        >
          Search
        </button>

    </div>
  )
}

export default SearchBar
