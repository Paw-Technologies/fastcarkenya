import React, { useEffect, useState } from 'react'
import useUserData from '../customHooks/useUserData'
import  { useGetUser} from '../customHooks/useGetUser'
import './comp.css'
import { useDispatch } from 'react-redux'
import { set_curr_chat } from '../Store.js/store'

const ChatListing = (props) => {
    const [userDetails] = useUserData()
    const dispatch = useDispatch()
    const {get_user} = useGetUser()
    const [user, setUser] =useState({name: "waiting..."})
    let myUser = async() =>{
        let x = props.chat.seller === userDetails.userId ? props.chat.buyer: props.chat.seller
        let user = await get_user(x)
        setUser(user)
    }

    let lastMessage = props.chat.messages[props.chat.messages.length -1]
    useEffect(()=>{
        myUser()
    }, [])

    const setCurr = () =>{
        console.log('this', props.chat)
        dispatch(set_curr_chat(props.chat))
    }
  return (
    <div className='chatListing' onClick={setCurr}>
        <h3>{user.name}</h3>
        <p>{lastMessage.message}</p>
        <em>{lastMessage.time}</em>
    </div>
  )
}

export default ChatListing