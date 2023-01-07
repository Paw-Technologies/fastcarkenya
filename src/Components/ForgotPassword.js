import React, { useState } from 'react'
import api from '../apis/api'
import Spinner from './Spinner'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [spin, setSpin] = useState(false)

    const send = async(e) =>{
        e.preventDefault()
        setSpin(true)
        await api.post('/forgotPassword', {email: email})
        .then(res=>{
            console.log(res.data)
            setSpin(false)
        }, ({response})=>{
            setSpin(false)
            alert(response.data.message)
        })
        .catch(({response})=>{
            alert(response.data.message)
            setSpin(false)
        })
    }
  return (
    <form style={{
        width: "50vmax",
        display: "grid",
        gridAutoFlow: "row",
        gap: "5%",
        margin: "auto"
    }} onSubmit={send}>
        {spin && <Spinner />}
        <h1>Password Reset Token will be sent to email</h1>
        <input className='input1' 
            placeholder='Email' 
            value={email}
            onChange={e=>setEmail(e.target.value)}
        />
        <button className='button1'>
            Submit
        </button>
    </form>
  )
}

export default ForgotPassword