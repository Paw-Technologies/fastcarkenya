import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import api from '../apis/api'
import './comp.css'

const EditAccount = () => {
    const cookie = new Cookies()
    const original = useRef()
    const [conf, setConf] = useState({change: false, value: ""})
    const [user, setUser] = useState({
        avi: "",
        name: "",
        email: "",
        phone: "",
        password: "",
    })
    async function getdata(){
        await api.get(`/me`, {headers: {id: cookie.get('userId')}})
            .then(res=>{
                setUser(p=>({...p,
                    avi: res.data.data.photo,
                    name: res.data.data.name,
                    email: res.data.data.email
                }))
                original.current = res.data.data
                console.log(user)

            }, ({response})=>{
                console.log(response)
            })
            .catch(({response})=>{
                console.log(response)
        })
    }
    const [changed, setChanged] = useState(false)

    const submit = async() =>{
        
    }

    useEffect(()=>{
        try {
            getdata()
        } catch (error) {
            alert("You need to log in again")
        }
        
    }, [])

    //let globPath = "http://localhost:5000/"
    let globPath = "https://fastcar.onrender.com/"
    
  return (
    <form className='editAccountForm' onSubmit={changed ? submit : null}>
        <div className='avi'>
            <img src={globPath+user.avi} alt='avi' />
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
            value={user.phone ? user.phone : "Add Phone Number"}
            onChange={e=>setUser(p=>({...p, phone: e.target.value}))}
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
            }else{
                setChanged(!changed)
            }
        }} >{changed ? "Save changes" : "Edit"}</button>
    </form>
  )
}

export default EditAccount