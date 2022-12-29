import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import './comp.css'
import Spinner from './Spinner'

const ImageViewer = (props) => {
    const [image, setImage] = useState("")
    const images = props.images
    const [count, setCount] = useState(0)

    

    const view = (next) =>{
        if(next === true){
            if (count < images.length){
                setCount(p=>p+1) 
            }
        }
        if(next === false){
            if(count > 0) setCount(p=>p-1)
        }
        document.querySelector(".selectImage").scrollTo(`${count}idx`)
    }

    if(typeof(images) === 'undefined') return <div>
        <Spinner />
    </div>

  return (
    <div className='imageViewer'>
        <div className='mainImg'>
            <button className='arrowBtn'
                style={{left: "5%"}}
                onClick={count > 0 ? ()=>view(false) : null} 
            ><FaAngleLeft /></button>

            <img src={typeof(images[count]) !== 'undefined' ? images[count] : images[0]} alt="" />

            <button className='arrowBtn'
                style={{right: '5%'}}
                onClick={()=>view(true)}
            ><FaAngleRight /></button>
        </div>
      <div className='selectImage' >
        {images.map((img, index)=><div key={index} 
            id={`${index}idx`}
            onClick={()=>setCount(index)}
        >
            <img
                src={img} alt="" 
                style={{opacity: count === index ? "1": "0.5"}}
            />
            </div>
        )}
      </div>
    </div>
  )
}

export default ImageViewer
