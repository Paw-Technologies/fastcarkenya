import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUser } from '../customHooks/useGetUser'
import useUserData from '../customHooks/useUserData'

const ChatBar = () => {
    const [userDetails, setUserData ] = useUserData()
    const currentChat = useSelector(state=>state.clientSlice.currentChat)
    // const {get_user} = useGetUser()
    const user = () => currentChat.seller.userId !== userDetails.userId ? currentChat.seller : currentChat.buyer
    // user()
  return (
    <nav className='chatBar'>
        <h2>{user().name || ""}</h2>
    </nav>
  )
}

export default ChatBar