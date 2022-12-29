import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DashBtn = (props) => {
  const lokeshen = useLocation()
  const navigation = useNavigate()

  const click = () =>{
    if(props.state) return navigation("/dashboard/"+props.path, 
    {state: {state: props.state}})
    navigation("/dashboard/"+ props.path)
    console.log(props.path)
  }

  return (
    <button className='dashBtn' style={{
      backgroundColor: "transparent",
      color: 'white',
      minWidth: "100px",
      borderBottom: lokeshen.pathname.includes(props.path) ? "4px solid white" : "4px solid transparent"
    }} onClick={click}
    >
      {props.text}
    </button>
  )
}

export default DashBtn
