import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserId } from '../customHooks/useUserId'
import { getUser } from '../Functions/funcs'
import './comp.css'

const ConvListItem = (props) => {
        const navigate = useNavigate()
  const { rtUserId } = useUserId()
  let chat = props.chat
  let contactId = () => chat.seller === rtUserId() ? chat.buyer : chat.seller
  const [user, setUser] = useState({name: "Loading..."})
  
  useEffect(()=>{
    let checkUser = sessionStorage.getItem(`${contactId()}`)
    const x = async() =>{
      let userDet = await getUser(contactId()).then().catch()
      
      setUser(userDet.data.user)
      sessionStorage.setItem(`${contactId()}`, JSON.stringify(userDet.data.user))
    }
    if(checkUser === 'undefined' || checkUser === null){
      x()
    }else{
      setUser(JSON.parse(checkUser))
    }
  }, [props])

  return (
    <div className='convListItem' onClick={()=>{
                {props.setChat(chat)}
                if(window.innerWidth < 600) navigate('openchat')
        }
        }>
        <h3>{user.name}</h3>
        <p>{chat.messages[chat.messages.length-1].message}</p>
        <p>{props.time}</p>
    </div>
  )
}

export default ConvListItem
