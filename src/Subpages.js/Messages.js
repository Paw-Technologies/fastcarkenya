import React, { useEffect } from 'react'
import './sub.css'
// import ConversationTitle from '../Components/ConvListItem'
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
    const [userDetails] = useUserData();
    const chats = useSelector(state=>state.clientSlice.chats)
    let socket = socketIO.connect(base);
    

    const fetch = async() =>{
        await api2.get('/getchats', {headers: {userId: userDetails.userId}})
        .then(res=>{
            dispatch(set_chats(res.data.chats))
        }, ({response})=>{
            alert(response.message)
        })
        .catch(({response})=>{
            alert(response.message)
        })
    }

    useEffect(()=>{
        try {
            let {seller} = lokeshen.state
            console.log()
            // assumes link is from viewtobuy and user is a buyer starting chat
            dispatch(set_curr_chat({seller: seller, buyer: userDetails, messages: []}))
        } catch (error) {
            
        }
        fetch()
    }, [])

    useEffect(()=>{
        try {
            socket.on('connection', ()=>{
                fetch()
            })
            socket.on('responded', ({seller, buyer})=>{
                if((seller.userId === userDetails.userId) || (buyer.userId === userDetails.userId)){
                    fetch()
                }
                return
            })
            return (()=>{
                socket.disconnect()
            })
        } catch (error) {
            console.log('xxx')
        }
        
    }, [chats])
    

    
        

    if(window.innerWidth < 800) return <div>
        {lokeshen.pathname.includes('chatlist') && <ChatList chats={chats} />}
        {lokeshen.pathname.includes("openchat") && <ChatScreen socket={socket} />}
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
