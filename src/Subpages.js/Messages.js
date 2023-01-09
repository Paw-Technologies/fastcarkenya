import React, { useEffect, useRef, useState } from 'react'
import './sub.css'
import ConversationTitle from '../Components/ConvListItem'
import { useLocation } from 'react-router-dom'
import api2, { base } from '../apis/api2'
import socketIO from 'socket.io-client'
import ChatScreen from '../Components/ChatScreen'
import ChatList from '../Components/ChatList'


const Messages = () => {
    let [socket, setSocket] = useState(socketIO.connect(base));
    const lokeshen = useLocation()
    const [currentChat, setCurrChat] = useState({
        seller: "",
        buyer: "",
        
    })

    useEffect(()=>{
        try {
            setCurrChat()
        } catch (error) {
            
        }
    }, [])

    if(window.innerWidth < 800) return <div>
        {lokeshen.pathname.includes('chatlist') && <ChatList />}
        {lokeshen.pathname.includes("openchat") && <ChatScreen />}
    </div>
    return (
        <div className='sub' id='messages'>
            <section>
                <ChatList />
            </section>
            <section>
                <ChatScreen socket={socket} 
                    currentChat={currentChat}
                />
            </section>
        </div>
    )
}

export default Messages
