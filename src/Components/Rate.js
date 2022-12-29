import React, { useState } from 'react'
import './comp.css'
import StarBtn from './StarBtn'
import { MdSend } from 'react-icons/md'
import api2 from '../apis/api2'

const Rate = (props) => {
    const [rate, setRate ] = useState(0)

    const sendResponse = async() =>{
        let riw = ['one', 'two', 'three', 'four', 'five']
        let rating = {}
        rating[`${riw[rate-1]}Star`] = rate;
        let details = {
            product: props.product,
        }
        await api2.post('/rate', {...rating, ...details})
        .then(res=>{
            alert(res.data.message)
        }, ({response})=>{
            alert(response.message)
        })
        .catch(({response})=>{
            alert(response.message)
        })
    }
  return (
    <div className='rate'>
        <h1>Rate Us</h1>
        <div>
            <StarBtn worth={1} rate={rate} setRate={setRate} />
            <StarBtn worth={2} rate={rate} setRate={setRate} />
            <StarBtn worth={3} rate={rate} setRate={setRate} />
            <StarBtn worth={4} rate={rate} setRate={setRate} />
            <StarBtn worth={5} rate={rate} setRate={setRate} />
        </div>
        <button className='button1'
            onClick={sendResponse}
        >
            Send Response{<MdSend />}
        </button>
    </div>
  )
}

export default Rate