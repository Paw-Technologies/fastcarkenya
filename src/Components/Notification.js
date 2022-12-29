import React,{useEffect, useState} from 'react'
import './comp.css'

const Notification = (props) => {
    const [show, setShow] = useState(true)
    useEffect(()=>{
      setTimeout(() => {
        
        props.dismiss("s")
      }, (3000));
    }, [])
    
    return (
      <>{show &&
        <div className='notification' >
          <h5>Notification ...</h5>
          <p>{props.message}</p>
        </div>
        }
    </>
    )
    
}

export default Notification