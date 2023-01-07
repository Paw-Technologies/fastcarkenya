import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'

const MessageInputBar = () => {
    const [message, setMessage] = useState("")

  return (
    <div className='messageInputBar'>
        <div>
            <input  
                className='input1'
                placeholder='Write Message...'
                value={message}
                onChange={e=>setMessage(e.target.value)}
            />
            <button >
                {<MdSend />}
            </button>
        </div>
    </div>
  )
}

export default MessageInputBar