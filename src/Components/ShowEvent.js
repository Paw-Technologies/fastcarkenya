import React from 'react'
import './comp.css'


const ShowEvent = (props) => {
    let event = props.event
  return (
    <div className='showEvent'>
        <img src={event.image} alt="event avi" />
        <div>
            <h5>{event.location}</h5>
            <h5>{event.date}</h5>
            <p>{event.description}</p>
        </div>
    </div>
  )
}

export default ShowEvent