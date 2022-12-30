import React from 'react'
import { useSelector } from 'react-redux'
import HomeLoadBanner from './HomeLoadBanner'
import ShowEvent from './ShowEvent'

const Allevents = () => {
        const events = useSelector(state=>state.clientSlice.events)
  return (
    <div className='category'>
        {events.length < 1 && <HomeLoadBanner />}
        {events.length > 0 && events.map(event=><ShowEvent 
                key={event._id}
                event={event}
        />)}
    </div>
  )
}

export default Allevents