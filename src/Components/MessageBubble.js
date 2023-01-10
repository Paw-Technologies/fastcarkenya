import React from 'react'
import useUserData from '../customHooks/useUserData'
import './comp.css'

const MessageBubble = ({message, sender, time}) => {
    const [userDetails] = useUserData()
    const style = {
        marginLeft: sender === userDetails.userId ? "auto" : "0",
        // marginRight: sender === userDetails.userId ? "0" : "auto"
    }
  return (
    <div className='messageBubble' style={style}>
        <p>{message}</p>
        <em>{time}</em>
    </div>
  )
}

export default MessageBubble