import React, { Suspense, useEffect, useState } from 'react'
import { useUserId } from '../customHooks/useUserId'
import { useGetUser} from '../customHooks/useGetUser'
import { getUser } from '../Functions/funcs'

const Message = (props) => {
    const { rtUserId } = useUserId()
    const message = props.message
    const isMe = () => message.sender === rtUserId()
    const style = {
        marginLeft: isMe() ? "auto" : "0",
        marginRight: isMe ? "0" : "auto",
        backgroundColor: isMe() ? "" : "#f08294"
    }
  return (
    <Suspense fallback={<div className='message' style={style}></div>} >
       <div className='message' style={style}>
            <b>{isMe() ? "Me" : props.sender.name}</b>
            <p>{message.message}</p>
            <em>{message.time}</em>
        </div> 
    </Suspense>
    
  )
}

export default Message