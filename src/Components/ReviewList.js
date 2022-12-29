import React, { useState } from 'react'
import "./comp.css"
import Review from './Review'
import Spinner from './Spinner'

const ReviewList = (props) => {
    const [reviews, setReviews] = useState([])
    const [message, setMessage] = useState("")

    const fetchReviews = async() =>{
        
    }
  return (
    <div className='reviews'>
        {(reviews.length > 1 && message.length > 0) && <h3><em>{message}</em></h3> }
        {(reviews.length > 1 && message !== "") && <Spinner />}
        {reviews.map((review, index )=> <Review 
          key={index}
        />)}
        <Review />
    </div>
  )
}

export default ReviewList