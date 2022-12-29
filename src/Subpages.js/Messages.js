import React, { useEffect, useState } from 'react'
import './sub.css'
import ConversationTitle from '../Components/ConvListItem'
import MsgInputBar from '../Components/MsgInputBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatOpen from '../Components/ChatOpen'
import api2 from '../apis/api2'
import { useUserId } from '../customHooks/useUserId'

const Messages = () => {
  const lokeshen = useLocation()
  const [currentChat, setCurrentChat] = useState("")
  const [seller, setSeller] = useState("")
  const [chats, setChats] = useState([])
  const { rtUserId } = useUserId()

  
  useEffect(()=>{
    async function fetchChats(){
      await api2.get('/getchats', {headers: {userid: rtUserId()}})
      .then(res=>{
        setChats(res.data.chats)
      })
    }

    fetchChats()
  }, [chats, currentChat])

  const ChatList = <>
    <h1 className='h1'>Messages</h1>
      <div>
          {chats.map(chat=><ConversationTitle 
            key={chat._id}
            chat={chat}
            setChat={setCurrentChat}
          />)}
      </div>
  </>

  if(window.innerWidth < 600) return(
    <>
      <Routes>
        <Route exact path={'/dashboard/messages'} element={ChatList} />
        <Route exact path={'/chat'} element={<ChatOpen />} />
      </Routes>
    </>
  )

  return (
    <div className='subPage' id='messages'>
      <section className='chatList'>
        {ChatList}
      </section>

      <section>
        <ChatOpen chat={currentChat} />
      </section>
    </div>
  )
}

export default Messages
