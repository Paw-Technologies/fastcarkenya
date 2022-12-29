
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import AddProductForm from '../Components/AddProductForm'
import DashboardNav from '../Components/DashboardNav'
import MyCatalogue from '../Components/MyCatalogue'
import Spinner from '../Components/Spinner'
import { useToken } from '../customHooks/useToken'
import Account from '../Subpages.js/Account'
import Messages from '../Subpages.js/Messages'
import MyProducts from '../Subpages.js/MyProducts'
import Orders from '../Subpages.js/Orders'
import UserEvents from '../Subpages.js/UserEvents'
import AuthPage from './AuthPage'

const UserDashboard = () => {
  const { rtToken } = useToken()
  const location = useLocation()
  const navigate = useNavigate()
  const cookie = new Cookies()
  const isLoggedIn = useSelector(state=>state.clientSlice.isLoggedIn)
  let isPhone = window.innerWidth < 600


  if(!rtToken()){
    return <AuthPage />
  } 

  return (
    <div className='page' id='userDashboard'>
      <DashboardNav />
      <Routes> 
        <Route exact path='/' element={<Orders />} />
        <Route exact path='/addproduct/' element={<MyProducts />} />
        <Route exact path='/addevent/' element={<UserEvents />} />
        <Route exact path='/messages/*' element={<Messages />} />
        <Route exact path='/productcatalogue' element={<MyCatalogue />} />
        <Route exact path='/eventcatalogue' element={<MyCatalogue />} />
        <Route exact path='/account/*' element={<Account />} />

      </Routes>
    </div>
  )
}

export default UserDashboard
