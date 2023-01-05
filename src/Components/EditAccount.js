import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import api from '../apis/api'
import api2 from '../apis/api2'
import { useUserId } from '../customHooks/useUserId'
import './comp.css'
import Spinner from './Spinner'

const EditAccount = () => {
        const { rtUserId } = useUserId()
    const original = useRef()
    const [spin, setSpin] = useState(false)
    const [conf, setConf] = useState({change: false, value: ""})
    const [user, setUser] = useState({
        avi: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    })
    async function getdata(){
        await api.get('/me', {headers: {id: rtUserId()}})
            .then(res=>{
                setUser(p=>({...p,
                    avi: res.data.data.photo,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    phoneNumber: res.data.data.phoneNumber,
                }))
                original.current = res.data.data

            }, ({response})=>{
                // console.log(response)
            })
            .catch(({response})=>{
                // console.log(response)
        })
    }
    const [changed, setChanged] = useState(false)

    const submit = async() =>{
        // e.preventDefault()
        setSpin(true)
        await api2.post('/editaccount', user, {headers: {userid: rtUserId()}})
        .then(res=>{
            console.log(res.data)
            setSpin(false)
        }, ({response})=>{
            alert(response)
        })
        .catch(({response})=>{
            alert(response)
        })
    }

    useEffect(()=>{
        try {
            getdata()
        } catch (error) {
            alert("You need to log in again")
        }
        
    }, [])

    //let globPath = "http://localhost:5000"
    let globPath = "https://fastcar.onrender.com"
    
  return (
    <form className='editAccountForm' onSubmit={changed ? submit : null}>
        {spin && <Spinner />}
        <div className='avi'>
            <img src={globPath+"/"+user.avi} alt='avi' />
        </div>
        <input className='input1' 
            value={user.name}
            placeholder="Username"
            onChange={e=>setUser(p=>({...p, name: e.target.value}))}
            disabled={changed ? "" : "disabled"}
        />       
        <input className='input1' 
            placeholder='Email'
            value={user.email}
            onChange={e=>setUser(p=>({...p, email: e.target.value}))}
            disabled={changed ? "" : "disabled"}
        />
        <input className='input1' 
            placeholder='phone'
            value={user.phoneNumber ? user.phoneNumber : "Add Phone Number"}
            onChange={e=>setUser(p=>({...p, phoneNumber: e.target.value}))}
            disabled={changed ? "" : "disabled"}
        />
        <input className='input1' 
            placeholder='Reset Password?'
            value={user.password}
            onChange={e=>{
                setConf(p=>({...p, change: user.password.length > 1 }))
                setUser(p=>({...p, password: e.target.value}))
            }}
            disabled={changed ? "" : "disabled"}
        />
        {conf.change && <input className='input1' 
            placeholder='Confirm Password'
            value={conf.value}
            onChange={e=>setConf(p=>({...p, value: e.target.value}))}
        />}
        
        <button className='button1' type='button' onClick={()=>{
            if(changed){
                // submit
                submit()
            }else{
                setChanged(!changed)
            }
        }} >{changed ? "Save changes" : "Edit"}</button>
    </form>
  )
}

export default EditAccount