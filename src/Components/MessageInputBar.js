import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useSelector } from 'react-redux'
import useUserData from '../customHooks/useUserData'
import { timeParser } from '../Functions/funcs'

const MessageInputBar = ({socket}) => {
    const [userDetails, setUserData] = useUserData()
    const currentChat = useSelector(state=>state.clientSlice.currentChat)
    const [send, setSend] = useState({
        seller: currentChat.seller,
        buyer: currentChat.buyer
    })
    const [message, setMessage] = useState({
        sender: userDetails.userId,
        message: "",
        time: ""
    })
    const sendMessage = () =>{
        let time = timeParser(new Date())
        setMessage(p=>({...p, time: time}))

        socket.emit('message', {
            seller: currentChat.seller,
            buyer: currentChat.buyer,
            message: message
        })
    }
  return (
    <div className='messageInputBar'>
        <div>
            <input  
                className='input1'
                placeholder='Write Message...'
                value={message.message}
                onChange={e=>setMessage(p=>({...p, message: e.target.value}))}
            />
            <button onClick={sendMessage} >
                {<MdSend />}
            </button>
        </div>
    </div>
  )
}

export default MessageInputBar