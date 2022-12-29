import React, { useState } from 'react'
import api2 from '../apis/api2'
import { useUserId } from '../customHooks/useUserId'
import { useLongHold } from '../customHooks/useLongHold'
import { holdToDelete } from '../Functions/funcs'
import './comp.css'
import ImageViewer from './ImageViewer'
import Notification from './Notification'

const EditProduct = (props) => {
    const product = props.product
    const { holdToDelete } = useLongHold()
    const [down, setDown] = useState(false)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")
    const [disabled, setdisbld] = useState(true)
    const [{
        images,
        description,
        location,
        name,
        contacts,
        brandName,
        model,
        partNumber,
        size,
        price,
        ET,
        cb,
        pcd,
        mileage,
        year,
        engineSize
    }, setEdit] = useState(props.product)

    let style = {
        height: `${show ? "fit-content" : "50vh"}`
    }

    const saveOnBlur = async(e) =>{

        let body = {field: e.target.name, value: e.target.value.charAt(0) === "*" ? e.target.value.slice(1, e.target.value.length): 
            e.target.value, prodId: product._id
        }
        await api2.post('/editproduct', body)
        .then(res=>{
            console.log(res.data)
            setMessage(res.data.message)
        }, ({response})=>{
            console.log(response)
        })
        .catch(({response})=>{
            console.log(response)
        })
    }

  return (
    <>
    {message.length > 1 && <Notification message={message} dismiss={setMessage} />}
    <div className='EditProductMajor' >
        <div className='EditProduct' style={style}>
        <ImageViewer images={product.images} />
       {name &&
        <div>
            <label>Name: </label>
             <input className='input1' 
                disabled={disabled}
                value={name}
                onChange={e=>{
                    if(name.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, name: "*"}))
                    }
                    setEdit(p=>({...p, name: e.target.value}))}
                }
                name='name'
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
       }
       {brandName && 
        <div>
            <label>Brand Name</label>
            <input className='input1'
                disabled={disabled}
                value={brandName}
                onChange={e=>{
                    if(brandName.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, brandName: "*"}))
                    }
                    setEdit(p=>({...p, brandName: e.target.value}))}
                }
                name="brandName"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
       }
       {model && 
        <div>
            <label>Model</label>
            <input className='input1'
                disabled={disabled}
                value={model}
                onChange={e=>{
                    if(model.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, model: "*"}))
                    }
                    setEdit(p=>({...p, model: e.target.value}))}
                }
                name="model"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter'){
                        saveOnBlur(e)
                        return e.target.blur()
                    } 
                }}
            />
        </div>
       }
       {location && 
        <div>
            <label>Location</label>
            <input className='input1'
                disabled={disabled}
                value={location}
                onChange={e=>{
                    if(location.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, location: "*"}))
                    }
                    setEdit(p=>({...p, location: e.target.value}))}
                }
                name="location"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
       }
       {contacts && 
       <div>
            <label>Contacts {disabled ? "" : "(Separate by comma (,))"}</label>
            <input className='input1'
                disabled={disabled}
                value={contacts}
                onChange={e=>{
                    if(contacts.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, contacts: "*"}))
                    }
                    setEdit(p=>({...p, contacts: e.target.value}))}
                }
                name="contacts"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
       }
       {partNumber && 
        <div>
            <label>Part Number</label>
            <input className='input1'
                disabled={disabled}
                value={partNumber}
                onChange={e=>{
                    if(partNumber.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, partNumber: "*"}))
                    }
                    setEdit(p=>({...p, partNumber: e.target.value}))}
                }
                name="partNumber"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
        }
        {size && 
        <div>
            <label>Size</label>
            <input className='input1'
                disabled={disabled}
                value={size}
                onChange={e=>{
                    if(size.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, size: "*"}))
                    }
                    setEdit(p=>({...p, size: e.target.value}))}
                }
                name="size"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
        }
        {price && 
        <div>
            <label>Price</label>
            <input className='input1'
                disabled={disabled}
                value={price}
                onChange={e=>{
                    if(price.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, price: "*"}))
                    }
                    setEdit(p=>({...p, price: e.target.value}))}
                }
                name="price"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
        }
        {ET && 
        <div>
            <label>ET</label>
            <input className='input1'
                disabled={disabled}
                value={ET}
                onChange={e=>{
                    if(ET.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, ET: "*"}))
                    }
                    setEdit(p=>({...p, ET: e.target.value}))}
                }
                name="ET"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
        }
        {cb && 
        <div>
            <label>CB</label>
            <input className='input1'
                disabled={disabled}
                value={contacts}
                onChange={e=>{
                    if(cb.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, cb: "*"}))
                    }
                    setEdit(p=>({...p, cb: e.target.value}))}
                }
                name="cb"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
         }
        {pcd && 
        <div>
            <label>PCD</label>
            <input className='input1'
                disabled={disabled}
                value={pcd}
                onChange={e=>{
                    if(pcd.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, pcd: "*"}))
                    }
                    setEdit(p=>({...p, pcd: e.target.value}))}
                }
                name="pcd"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
         }
        {mileage && 
        <div>
            <label>Mileage</label>
            <input className='input1'
                disabled={disabled}
                value={mileage}
                onChange={e=>{
                    if(mileage.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, mileage: "*"}))
                    }
                    setEdit(p=>({...p, mileage: e.target.value}))}
                }
                name="mileage"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
         }
        {year && 
        <div>
            <label>Year</label>
            <input className='input1'
                disabled={disabled}
                value={year}
                onChange={e=>{
                    if(year.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, year: "*"}))
                    }
                    setEdit(p=>({...p, year: e.target.value}))}
                }
                name="year"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
         }
        {engineSize && 
        <div>
            <label>Engine Size</label>
            <input className='input1'
                disabled={disabled}
                value={engineSize}
                onChange={e=>{
                    if(engineSize.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, engineSize: "*"}))
                    }
                    setEdit(p=>({...p, engineSize: e.target.value}))}
                }
                name="engineSize"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
        </div>
         }
         <div>
            <label>Description</label>
            <textarea 
                disabled={disabled}
                value={description}
                onChange={e=>{
                    if(description.length === 1){
                        if(e.target.value === "") return setEdit(p=>({...p, description: "*"}))
                    }
                    setEdit(p=>({...p, description: e.target.value}))}
                }
                name="description"
                onBlur={saveOnBlur}
                onKeyDown={e=>{
                    if(e.key === 'Enter') return saveOnBlur(e)
                }}
            />
         </div>
    </div>
        <div className='btns'>
            <button className='button1' 
                onClick={()=>setShow(!show)}
            >{show ? "Hide" : "Show"}</button>
            <button className='button1'
                onClick={()=>setdisbld(!disabled)}
            >
                {disabled ? "Edit" : "Save"}</button>

            <button className='button1' 
                onMouseDown={e=>{
                    holdToDelete(e, "x")
                    setDown(true)
                }}
                onMouseUp={e=>{
                    let x = holdToDelete(e, product._id)
                    if(x)props.remove(product._id)
                    setDown(false)
                }}
            >
                {down ? "Deleting" : "Delete"}</button>
        </div>
    </div>
    </>
  )
}

export default EditProduct