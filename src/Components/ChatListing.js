import React, { useEffect, useState } from 'react'
import useUserData from '../customHooks/useUserData'
import  { useGetUser} from '../customHooks/useGetUser'
import './comp.css'
import { useDispatch, useSelector } from 'react-redux'
import { set_curr_chat } from '../Store.js/store'
import { useNavigate } from 'react-router-dom'

const ChatListing = (props) => {
    const navigate = useNavigate()
    const recepId = () => props.chat.seller === userDetails.userId ? props.chat.buyer: props.chat.seller
    const [userDetails] = useUserData()
    const dispatch = useDispatch()
    const currentChat = useSelector(state=>state.clientSlice.currentChat)
    const [user, setUser] =useState({name: "waiting..."})

    const myUser = () => currentChat.seller.userId !== userDetails.userId ? currentChat.seller : currentChat.buyer

    let lastMessage = props.chat.messages[props.chat.messages.length -1]
    
    const setCurr = () =>{
        dispatch(set_curr_chat(props.chat))
        if(window.innerWidth < 600) navigate('dashboard/openchat')
    }

    console.log(props.chat)
  return (
    <div className='chatListing' onClick={setCurr}>
        <h3>{myUser().name}</h3>
        <p>{lastMessage.message.slice(0, 25)+"..."}</p>
        <em>{lastMessage.time}</em>
    </div>
  )
}

export default ChatListing