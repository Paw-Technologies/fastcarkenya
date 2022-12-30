import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import api2 from '../apis/api2'
import { useUserId } from '../customHooks/useUserId'

const MsgInputBar = (props) => {
  const lokeshen = useLocation()
  const { rtUserId } = useUserId()
  const [newMsg, setNewMsg] = useState({
    message: "",
    sender: rtUserId()
  })

  const seller = () => {
    if(typeof(props.chat.seller) !== 'undefined'){
      return props.chat.seller
    }
    if(typeof(lokeshen.state.seller) !== 'undefined'){
      return lokeshen.state.seller
    }
    return rtUserId()
  }

  const sendMessage = async() => {
    if(newMsg.message.length < 1) return alert("Message can't be empty")
    await api2.post('/sendmessage', {
      chatId: typeof(props.chat) === 'undefined' ? localStorage.getItem("chatId") : props.chat._id,
      buyer: props.chat.buyer ? props.chat.buyer : rtUserId(),
      seller: seller(),
      message: JSON.stringify(newMsg)
    })
    .then(res=>{
      if(res.data.chatId){
        localStorage.setItem('chatId', res.data.chatId)
      }
      setNewMsg(p=>({...p, message: ""}))
    }, (err)=>{

    })
    .catch(({response})=>{
        
    })
    
  }

  return (
    <div className='msgInputBar'>
      <input className='input1' 
        placeholder='Message...'
        value={newMsg.message}
        onChange={e=>setNewMsg(p=>({...p, message: e.target.value})) }
      />
      <button onClick={sendMessage}>
        <MdSend />
      </button>
    </div>
  )
}

export default MsgInputBar