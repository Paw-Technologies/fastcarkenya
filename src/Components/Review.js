import React from 'react'
import './comp.css'

const Review = (props) => {
    const rating = ['⭐', '⭐', '⭐', '⭐', '⭐']
  return (
    <div className='reviewWidget'>
        <span>
            <p>Review</p>
            <p>{rating.slice(0, 4.5)}</p>
        </span>
        <p>{"lorem ipsum lorem ipsum lorem upsum lorep ipsum lorem ipsum"}</p>
        
    </div>
  )
}

export default Review