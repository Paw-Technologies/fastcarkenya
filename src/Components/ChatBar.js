import React from 'react'
import { useSelector } from 'react-redux'
import useUserData from '../customHooks/useUserData'

const ChatBar = () => {
    const [userDetails, setUserData ] = useUserData()
    const currentChat = useSelector(state=>state.clientSlice.currentChat)
  return (
    <nav className='chatBar'>
        <h2>{currentChat.seller === userDetails.userId ? 
                currentChat.buyer : currentChat.seller}</h2>
    </nav>
  )
}

export default ChatBar