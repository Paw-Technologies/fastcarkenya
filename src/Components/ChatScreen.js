import React from 'react'
import ChatBar from './ChatBar'
import MessageInputBar from './MessageInputBar'
import MessageList from './MessageList'
import './comp.css'

const ChatScreen = () => {
  return (
    <div className='chatScreen'>
        <ChatBar />
        <MessageList />
        <MessageInputBar />
    </div>
  )
}

export default ChatScreen