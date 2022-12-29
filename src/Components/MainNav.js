import React, { useEffect, useState } from 'react'
import { FaList, FaPlus } from 'react-icons/fa'
import { MdEvent, MdOutlineAccountCircle, MdOutlineMessage } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useToken } from '../customHooks/useToken'
import CartBtn from './CartBtn'
import './comp.css'
import CompanyIcon from './CompanyIcon'
import LinkBtn from './DashBtn'
import MobileSearchBar from './MobileSearchBar'
import SearchBar from './SearchBar'

const MainNav = (props) => {
  const {token, rtToken, setToken} = useToken()
  const navigate = useNavigate()
  const orders = useSelector(state=>state.clientSlice.orders.length)
  const isLoggedIn = useSelector(state=>state.clientSlice.isLoggedIn)
  const [show, setShow] = useState(false)


  const handleNavigate = (e) =>{
    navigate(e.target.name)
  }

  return (
    <nav className='mainNav' >
      <div>
        <CompanyIcon />
        <SearchBar />
        <div className='linkBtns'>
          <button className='linkBtn' name='/dashboard/addproduct'
            onClick={handleNavigate}
          >
            Post Product<FaPlus />
          </button>

          <button className='linkBtn' name='/dashboard/addevent'
            onClick={handleNavigate}
          >
            Post Event <MdEvent />
          </button>

          <button className='linkBtn' name='/dashboard/messages'
            onClick={handleNavigate}
          >
            Messages <MdOutlineMessage />
          </button>

          <button className='linkBtn' name={rtToken() ? '/dashboard/account' : "/auth" /**cookie.get('accessTkn')*/}
            onClick={handleNavigate}
          >
            {rtToken() ? "Account" : "Sign In/Signup"} <MdOutlineAccountCircle />
          </button>
        </div>
      </div>
      <MobileSearchBar />
    </nav>
  )
}

export default MainNav
/**cookie.get('accessTkn')*/