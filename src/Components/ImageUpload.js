import React, { useState } from 'react'

const ImageUpload = (props) => {
    const [src, setSrc] = useState(0)
    const [count, setCount] = useState(0)
    const [noText, setTxt] = useState(true)
    const [images, setImages] = useState([])

    const handleUpload = (e)=>{
        try {
            let url = URL.createObjectURL(e.target.files[0]);
            if(e.target.files.length > 10 )return alert("You can upload a max of 10 images");
            setSrc(url)
            setImages(e.target.files)
            props.setImage(p=>({...p, images: e.target.files}))
            if(typeof(props.form) !== 'undefined')props.form.append('imageCover', e.target.files[0]);
            if(props.multi){
                props.form.append('images', [e.target.files[1], e.target.files[2], e.target.files[3]])
            }
            if (e.target.value === null || typeof(e.target.value)==='undefined') {
                setTxt(true)
                return
            }
            setTxt(e.target.value.name)
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className='imgUpload' >
        {noText && <h5>upload image</h5>  }
        {!noText && <img src={URL.createObjectURL(images[count])} alt="" />}
        <input name='image' onChange={handleUpload} type='file' accept='image/*' multiple={props.multi ? props.multi : true} />
    </div>
  )
}

export default ImageUpload
