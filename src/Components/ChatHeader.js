import React from 'react'
import { useLocation } from 'react-router-dom'

const ChatHeader = (props) => {
    const lokeshen = useLocation()
    let name = (typeof(props.contact) === 'undefined' || props.contact === null) ? {name: "Wait"} : props.contact
  return (
    <div className='chatHeader'>
        {}
    </div>
  )
}

export default ChatHeader