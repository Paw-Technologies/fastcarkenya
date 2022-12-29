import React from 'react'
import './comp.css'

class Spinner extends React.Component{
    constructor(){
      super();
      this.state = {animName: "spin"}
    }
     stop(){
       this.setState({animName: "none"})
    }
    render(){
      return <div className='spinner' style={{
        animationName: `${this.state.animName}`
      }} />
    }
}


export default Spinner
