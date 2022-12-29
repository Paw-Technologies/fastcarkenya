import React from 'react'
import './comp.css'
import { useSelector } from 'react-redux'
import { useUserId } from '../customHooks/useUserId'
import ShowEvent from './ShowEvent'

const MyEvents = () => {
    const { rtUserId } = useUserId()
    const myEvents = useSelector(state=>state.clientSlice.events)
  return (
    <div className='myevents'>
        <h1>My Events</h1>
        <div className='category'>
           {myEvents.map(event=><ShowEvent 
                key={event._id}
                event={event}
            />)} 
        </div>
        
    </div>
  )
}

export default MyEvents