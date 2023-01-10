import React from 'react'
import './comp.css'
import { useDispatch, useSelector } from 'react-redux'
import useChats from '../customHooks/useChats';
import useUserData from '../customHooks/useUserData';
import ChatListing from './ChatListing';

const ChatList = ({chats}) => {
    const dispatch = useDispatch()
    const [userDetails] = useUserData()
    const {getChats} = useChats()
    // const chats = useSelector(state=>state.clientSlice.chats)


  return (
    <div className='chatList'>
        <h1>Chats</h1>
        <div className='chats'>
            {chats.map(chat=><ChatListing 
                key={chat._id}
                chat={chat}
            />)}
        </div>
    </div>
  )
}

export default ChatList