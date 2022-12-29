import React from 'react'
import './sub.css'
import AddEventForm from '../Components/AddEventForm'
import MyEvents from '../Components/MyEvents'

const UserEvents = () => {
  return (
    <div className='sub' id='userEvents'>
        <section>
            <AddEventForm />
        </section>
        <section>
            <MyEvents />
        </section>
    </div>
  )
}

export default UserEvents
