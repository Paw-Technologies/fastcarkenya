import React, { useEffect, useRef, useState } from 'react'
import './sub.css'
import ConversationTitle from '../Components/ConvListItem'
import { useLocation } from 'react-router-dom'
import api2, { base } from '../apis/api2'
import socketIO from 'socket.io-client'
import ChatScreen from '../Components/ChatScreen'
import ChatList from '../Components/ChatList'
import { useDispatch, useSelector } from 'react-redux'
import { set_chats, set_curr_chat } from '../Store.js/store'
import useUserData from '../customHooks/useUserData'


const Messages = () => {
    const lokeshen = useLocation()
    const dispatch = useDispatch()
    const [userDetails, setUserData] = useUserData();
    const chats = useSelector(state=>state.clientSlice.chats)
    let [socket, setSocket] = useState(socketIO.connect(base));
    

    const fetch = async() =>{
        let x = await api2.get('/getchats', {headers: {userId: userDetails.userId}})
        dispatch(set_chats(x.data.chats))
    }

    useEffect(()=>{
        try {
            let {seller} = lokeshen.state
            // assumes link is from viewtobuy and user is a buyer starting chat
            dispatch(set_curr_chat({seller: seller, buyer: userDetails.userId, messages: []}))
        } catch (error) {

        }
        fetch()
    }, [])

    socket.on('connection', ()=>{
        fetch()
    })

    socket.on('responded', ({seller, buyer})=>{
        console.log((seller + buyer).includes(userDetails.userId))
        if((seller + buyer).includes(userDetails.userId)){
            fetch()
        }
        return
    })
        

    if(window.innerWidth < 800) return <div>
        {lokeshen.pathname.includes('chatlist') && <ChatList />}
        {lokeshen.pathname.includes("openchat") && <ChatScreen />}
    </div>
    return (
        <div className='sub' id='messages'>
            <section>
                <ChatList chats={chats} /> 
            </section>
            <section>
                <ChatScreen socket={socket} />
            </section>
        </div>
    )
}

export default Messages
