import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import api from '../apis/api'
import Spinner from '../Components/Spinner'
import useUserData from '../customHooks/useUserData'
import { useUserId } from '../customHooks/useUserId'
import illust from '../images/carxray.png'
import { log_in } from '../Store.js/store'

const AuthPage = (props) => {
    const {setUserId} = useUserId()
    const navigate = useNavigate()
    const lokeshen = useLocation()
    const cookie = new Cookies()
    // let isLog = useSelector(state=>state.clientSlice.isLoggedIn)
    const dispatch = useDispatch()
    const [isLoggedIn, setIsLogIn] = useState(false)
    const [spin, setSpin] = useState(false)
    const [message, setMsg] = useState("")
    const [ userDetails, setUserData ] = useUserData()
    const [details, setDet] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        password: "",
        passwordConfirm: ""
    })
    
    
    // cookie.remove('accessTkn')

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
                setDet(p=>({...p, phoneNumber: e.target.value}))
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

            setUserId(res.data.data.user._id)
            console.log(res.data.data.user)
            setUserData('t', res.data.token)
            setUserData('n', res.data.data.user.name)
            setUserData('e', res.data.data.user.email)
            setUserData('i', res.data.data.user.id)
            setUserData('p', res.data.data.user.phoneNumber)
            
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
            
            setUserId(res.data.data.user._id)
            
            setUserData('t', res.data.token)
            setUserData('n', res.data.data.user.name)
            setUserData('e', res.data.data.user.email)
            setUserData('i', res.data.data.user.id)
            setUserData('p', res.data.data.user.phoneNumber)

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

    // if(isForgPass) return <ForgotPassword />
    
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
            value={details.phoneNumber}
            onChange={input}
        />}
        {!isLoggedIn && <input className='input1' 
            type='text'
            placeholder='Country'
            name='country'
            value={details.country}
            onChange={e=>setDet(p=>({...p, country: e.target.value}))}
        />}
        {!isLoggedIn && <input className='input1' 
            type='text'
            placeholder='City'
            name='city'
            value={details.city}
            onChange={e=>setDet(p=>({...p, city: e.target.value}))}
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
            type='submit'
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
        {/* <button className='button1'
            onClick={()=>setIsFog(true)}
        >Forgot your password?</button> */}
      </form>

        {window.innerWidth > 600 &&<div className='illust'>
            <img src={illust} alt="illustration" />
            <h1 className='h1'>Scale your automotive business</h1>
        </div>}
    </div>
  )
}

export default AuthPage
