import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import api from '../apis/api'
import EditAccount from '../Components/EditAccount'
import MyCatalogue from '../Components/MyCatalogue'
import Spinner from '../Components/Spinner'
import { useToken } from '../customHooks/useToken'
import { log_out } from '../Store.js/store'

const Account = () => {
  const cookie = new Cookies()
  const { token, setToken } = useToken()
  const navigate = useNavigate()
  const [spin, setSpin] = useState(false)
  const dispatch = useDispatch()
  const userProducts = useSelector(state=>state.clientSlice.userProducts)
  

  let Dashboard = <div>
        {spin && <Spinner />}
        <button className='button2' onClick={()=>navigate('ads')}>
          My ads
        </button>

        <button className='button2' onClick={()=>navigate('settings')}>
          Settings
        </button>

        <button className='button2' onClick={()=>{
          setSpin(true)
          setTimeout(() => {
            //cookie.remove('userId')
            //cookie.set('accessTkn', undefined, {path: "*"})
            setToken("")
            
            dispatch(log_out(false))
            navigate('/')
          }, 1500);
        }}>
          Logout
        </button>
      </div>

  return (
    <div className='sub' id='accountSubPage'>
      <Routes>
        <Route exact path='/' element={Dashboard} />
        <Route exact path='/ads' element={<MyCatalogue />} />
        <Route exact path='/settings' element={<EditAccount />} />
      </Routes>
    </div>
  )
}

export default Account
