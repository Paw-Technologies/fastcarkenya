import React, { useState } from 'react'
import './comp.css'
import ImageUpload from './ImageUpload'
import api2 from '../apis/api2'
import Spinner from './Spinner'
import { useUserId} from '../customHooks/useUserId'

const AddEventForm = () => {
  const { rtUserId } = useUserId()
  const [image, setImage] = useState("")
  const [spin, setSpin] = useState(false)

  const submitEvent = async(e) => {
    e.preventDefault()
    setSpin(true)
    let formData = new FormData(e.target);
    await api2.post('/addevent', formData, {headers: {userid: rtUserId()}})
    .then(res=>{
      alert(res.data.message)
      setSpin(false)
    }, ({response})=>{
      alert(response.data.message)
      setSpin(false)
    })
    .catch(({response})=>{
      alert(response.data.message)
      setSpin(false)
    })
  } 

  return (
    <form className='addEventForm' onSubmit={submitEvent} >
        {spin && <Spinner />}
        <h1 className='h1'>Add Event</h1>
        <ImageUpload multi={false} setImage={setImage} />
        <input className='input1' 
          placeholder='Event Title'
          name='title'
          required
        />
        <input className='input1' 
            placeholder='Event Location'
            name='location'
            required
        />
        <input className='input1' 
            placeholder='Event Date'
            name='date'
            type='date'
            required
        />
        <textarea 
          placeholder='Event Description'
          name='description'
        />
        <button className='button1'>
            Post Event
        </button>
    </form>
  )
}

export default AddEventForm
