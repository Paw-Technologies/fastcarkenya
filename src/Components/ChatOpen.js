import React, { useEffect, useState } from 'react'
import MsgInputBar from './MsgInputBar'
import './comp.css'
import ChatHeader from './ChatHeader'
import { useUserId } from '../customHooks/useUserId'
import Message from './Message'
import { getUser } from '../Functions/funcs'




const ChatOpen = (props) => {
  const { rtUserId } = useUserId()

  const [chat, setChat] = useState([])
  const [user, setUser] = useState({name: "wait..."})
  const contactId = () => chat.seller === rtUserId() ? chat.buyer : chat.seller
  const [refresh, setRefresh] = useState(0)

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
    <div className='chatOpen'>
        <ChatHeader contact={user} />
        <div className='messages'>
          {typeof(props.chat.messages) !== 'undefined' && 
          props.chat.messages.map((message, index)=><Message 
            key={index}
            message={message}
            sender={user}
          />)}
        </div>
        <MsgInputBar chat={props.chat} />
    </div>
  )
}

export default ChatOpen