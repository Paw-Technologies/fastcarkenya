import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import useUserData from '../customHooks/useUserData'
import { timeParser } from '../Functions/funcs'
import { add_message } from '../Store.js/store'

const MessageInputBar = ({socket}) => {
    const [userDetails, setUserData] = useUserData()
    const dispatch = useDispatch()
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
        // let time = timeParser(new Date())
        // setMessage(p=>({...p, time: time}))

        dispatch(add_message(message))

        socket.emit('message', {
            seller: currentChat.seller,
            buyer: currentChat.buyer,
            message: message
        })
        setMessage(p=>({...p, message: ""}))
    }
  return (
    <div className='messageInputBar'>
        <div>
            <input  
                className='input1'
                placeholder='Write Message...'
                value={message.message}
                onChange={e=>setMessage(p=>({...p, message: e.target.value, time: timeParser(new Date())}))}
            />
            <button onClick={sendMessage} >
                {<MdSend />}
            </button>
        </div>
    </div>
  )
}

export default MessageInputBar