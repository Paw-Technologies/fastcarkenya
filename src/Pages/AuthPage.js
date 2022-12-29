import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import api from '../apis/api'
import Spinner from '../Components/Spinner'
import { useToken } from '../customHooks/useToken'
import { useUserId } from '../customHooks/useUserId'
import illust from '../images/carxray.png'
import { log_in } from '../Store.js/store'

const AuthPage = (props) => {
    const {token, setToken} = useToken()
    const {userId, setUserId} = useUserId()
    const navigate = useNavigate()
    const lokeshen = useLocation()
    const cookie = new Cookies()
    let isLog = useSelector(state=>state.clientSlice.isLoggedIn)
    const dispatch = useDispatch()
    const [isLoggedIn, setIsLogIn] = useState(false)
    const [spin, setSpin] = useState(false)
    const [message, setMsg] = useState("")
    const [details, setDet] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: ""
    })
    
    
    cookie.remove('accessTkn')

    const input = (e) =>{
        // eslint-disable-next-line default-case
        switch(e.target.name){
            case 'name': {
                setDet(p=>({...p, name: e.target.value}))
                break;
            }
            case 'email': {
                setDet(p=>({...p, email: e.target.value}))
                break;
            }
            case 'phone': {
                setDet(p=>({...p, phone: e.target.value}))
                break
            }
            case 'password': {
                setDet(p=>({...p, password: e.target.value}))
                break
            }
            case 'conf': {
                setDet(p=>({...p, passwordConfirm: e.target.value}))
                break
            }
        }
    }

    const handleLogin = async(e) =>{
        e.preventDefault()
        setSpin(true)
        let request = {email: details.email, password: details.password}

        await api.post('/login', request, {headers: {
            'x-forwarded-proto': "https"
        }})
        .then(res=>{
            setSpin(false)

            setToken(res.data.token)
            setUserId(res.data.data.user._id)

            dispatch(log_in())
            if(!lokeshen.pathname.includes("auth")){
                navigate(lokeshen.pathname)
            }else{
                navigate('/')
            }
        }, ({response})=>{
            setMsg(response.data.message)
            setSpin(false)
        })
        .catch(err=>{
            setMsg(err.message)
            setSpin(false)
        })
    }
    const handleSignup = async(e) =>{
        e.preventDefault()
        setSpin(true)
        await api.post('/signup', details, {Headers: {
            'x-forwarded-proto': "https"
        }})
        .then(res=>{
            setSpin(false)
            cookie.set('accessTkn', `${res.data.token}`, {path: "*"})
            cookie.set('userId', `${res.data.data.user._id}`, {path: "*"})
            cookie.set('isLoggedIn', true, {path: "*"})
            
            setToken(res.data.token)
            setUserId(res.data.data.user._id)
            

            dispatch(log_in())
            if(!lokeshen.pathname.includes("auth")){
                navigate(lokeshen.pathname)
            }else{
                navigate('/')
            }
        }, ({response})=>{
            console.log("this ", response)
            setMsg(response.data.message)
            setSpin(false)
            
        })
        .catch(err=>{
            console.log("this, ", err)
            setMsg(err.message)
            setSpin(false)
        })
    }

  return (
    <div className='page' id='authPage'>
      <form className='authForm' onSubmit={isLoggedIn ? handleLogin : handleSignup}>
        <span style={{display: 'grid', gridAutoFlow: 'column'}}>
            <h1 className='h1'>{isLoggedIn ? "Login" : "Sign Up"}</h1>
            <p>{message}</p>
        </span>
        {!isLoggedIn && <input className='input1' 
            type='text'
            placeholder={isLoggedIn ? 'Username/email' : 'Username'}
            name="name"
            value={details.name}
            onChange={input}
        />}
        {spin && <Spinner />}
         <input className='input1' 
            type='email'
            placeholder='Email'
            name='email'
            value={details.email}
            onChange={input}
        />
        {!isLoggedIn && <input className='input1' 
            type='tel'
            placeholder='Phone Number'
            name='phone'
            value={details.phone}
            onChange={input}
        />}
        <input className='input1' 
            type='password'
            placeholder='Password'
            name='password'
            value={details.password}
            onChange={input}
        />
        {!isLoggedIn && <input className='input1' 
            type='password'
            placeholder='Confirm Password'
            name='conf'
            value={details.passwordConfirm}
            onChange={input}
        />}
        {!isLoggedIn && <p>By Clicking Sign Up you agree to our <a href='/termsandcondition'>terms and conditions</a></p>}
        <button className='button1'

        >
            {isLoggedIn ? "Login" : "Sign Up"}
        </button>
        <button className='button1'
            type='button'
            onClick={()=>setIsLogIn(!isLoggedIn)}
        >
            {isLoggedIn ? "Dont have an account, signup Instead?" : 
            "Have an account login instead?"}
        </button>
      </form>

        {window.innerWidth > 600 &&<div className='illust'>
            <img src={illust} alt="illustration" />
            <h1 className='h1'>Scale your automotive business</h1>
        </div>}
    </div>
  )
}

export default AuthPage
