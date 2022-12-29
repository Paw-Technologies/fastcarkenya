import React, { useRef } from 'react'
import { MdStar } from 'react-icons/md'

const StarBtn = (props) => {
    const worth = useRef(props.worth)

    let style = {
        color: props.rate >= worth.current ? "#ff002f" : "#adaaaa"
    }

    const click = () =>{
        props.setRate(worth.current)
    }

  return (
    <button className='starBtn' onClick={click} 
        style={style}
    >
        <MdStar />
    </button>
  )
}

export default StarBtn