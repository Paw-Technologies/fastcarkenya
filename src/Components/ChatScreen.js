import React, { useState } from 'react'
import ChatBar from './ChatBar'
import MessageInputBar from './MessageInputBar'
import MessageList from './MessageList'
import './comp.css'
import useUserData from '../customHooks/useUserData'

const ChatScreen = ({socket}) => {
    const [userDetails, setUserData] = useUserData()

    return (
        <div className='chatScreen'>
            <ChatBar />
            <MessageList />
            <MessageInputBar socket={socket} />
        </div>
    )
}

export default ChatScreen