import React from 'react'
import { useSelector } from 'react-redux'
import useUserData from '../customHooks/useUserData'
import './comp.css'
import MessageBubble from './MessageBubble'

const MessageList = () => {
    const [userDetails] = useUserData()
    const messages = useSelector(state=>state.clientSlice.currentChat.messages)
    //console.log(messages.messages)

    const getMsg = () => {
        return messages
    }
  return (
    <div className='messageList'>
        {messages.length < 1 && <h1>Select</h1>}
        {messages.length > 0 && getMsg().map((msg, indx) => <MessageBubble 
            key={indx}
            message={msg.message}
            sender={msg.sender}
            time={msg.time}
        />)}
    </div>
  )
}

export default MessageList