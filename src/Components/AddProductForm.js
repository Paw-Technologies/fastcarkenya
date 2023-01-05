import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api2 from '../apis/api2'
import { useUserId } from '../customHooks/useUserId'
import './comp.css'
import ImageUpload from './ImageUpload'
import Spinner from './Spinner'

const AddProductForm = () => {
    const {rtUserId} = useUserId()
    const [spin, setSpin] = useState(false)
    const categories = useSelector(state=>state.clientSlice.categories)
    let formdata = new FormData()

    const [product, setProduct] = useState({
        images: [],
        coverImg: "",
        category: "null",
        brandName: "",
        model: "",
        location: "",
        partNumber: "",
        isUsed: false,
        price: "",
        size: "",
        width: "",
        ET: "",
        cb: "",
        pcd: "",
        year: "",
        mileage: "",
        engineSize: "",
        partNo: "",
        description: "",
        transmission: "",
        powerOutput: "",
        currentTurbo: "",
        driveTrain: "",
    })

    const getIsService = () => {
        try {
            return product.category.includes("GARAGE") || 
            product.category.includes("WRAP SHOP") ||
            product.category.includes("PAINT/BODY SHOP")
        } catch (error) {
            return false
        }
        
    }

    const [garage, setGarage] = useState({
        name: "",
        location: "",
        contacts: ""
    })

    const sendProduct = async(e) =>{
        e.preventDefault()
        formdata.append('category', product.category)
        formdata.append('seller', rtUserId())
        formdata.append("description", product.description)
        formdata.append('location', garage.location)
        // formdata.append('imageCover', product.images[0])
        for(let i of product.images){
             formdata.append('images', i)
        }
        //return
        if(getIsService()){
            formdata.append('name', garage.name)
            formdata.append('contacts', garage.contacts)
        } else {
            formdata.append('brandName', product.brandName)
            formdata.append('model', product.model)
            formdata.append('partNumber', product.partNumber)
            formdata.append('size', product.size)
            formdata.append('price', product.price)
            formdata.append('ET', product.ET)
            formdata.append('cb', product.cb)
            formdata.append('pcd', product.pcd)
            formdata.append('mileage', product.mileage)
            formdata.append('year', product.year)
            formdata.append('engineSize', product.engineSize)
            if(product.category.includes("PERFORMANCE CARS")){
                formdata.append('transmission', product.transmission)
                formdata.append('powerOutput', product.powerOutput)
                formdata.append('currentTurbo', product.currentTurbo)
                formdata.append('driveTrain', product.driveTrain)
            }
        }
        setSpin(true)
        await api2.post("/postproduct", formdata,{Headers: {
            'Content-Type': 'multipart/form-data',
          }})
        .then(res=>{
            setSpin(false)
            alert(res.data.message)
        }, ({response})=>{
            setSpin(false)
            alert(response.data.message)
        })
        .catch(({response})=>{
            setSpin(false)
        })
    }

    const disabled = () => product.category === "null"

  return (
    <form className='addProductForm' onSubmit={sendProduct}>
        {spin && <Spinner />}
        <ImageUpload setImage={setProduct} form={formdata} multi={true} />
        <div>
            <label>Category</label>
            <select value={product.category} required onChange={e=>{
                if(e.target.value !== null)setProduct(p=>({...p, category: e.target.value}))
            }}>
                <option value={"null"}>Select</option>
                {categories.map((cat, index)=><option key={index} value={cat.n}
                     onClick={e=>setProduct(p=>({...p, category: e.target.value}))}
                >
                    {cat.n}
                </option>)}
            </select>
        </div>
        {!getIsService() && <>
            <div>
                <label>{product.category.includes("PARTS") ? "Part" : "Brand"} Name</label>
                <input 
                    disabled={disabled()}
                    className='input1'
                    placeholder={`${product.category.includes("PARTS") ? "Part" : "Brand"} Name`}
                    value={product.brandName}
                    onChange={e=>setProduct(p=>({...p, brandName: e.target.value}))}
                />
            </div>

            <div>
                <label>Model</label>
                <input 
                    className='input1'
                    placeholder='Model'
                    value={product.model}
                    onChange={e=>setProduct(p=>({...p, model: e.target.value}))}
                />
            </div>
            
            <div>
                <label>Price</label>
                <input
                    className='input1'
                    placeholder='Enter amount'
                    value={product.price}
                    onChange={e=>setProduct(p=>({...p, price: e.target.value}))}
                />
            </div>
            
            {product.category.includes("CARS") && 
            <> 
                <div>
                    <label>Year</label>
                    <input 
                        className='input1'
                        placeholder='Year'
                        value={product.year}
                        onChange={e=>setProduct(p=>({...p, year: e.target.value}))}
                    />
                </div>
                <div>
                    <label>Engine Size (cc)</label>
                    <input 
                        className='input1'
                        placeholder='Engine size(in cc)'
                        value={product.engineSize}
                        onBlur={e=>{
                            if(product.category.includes("PERFORMANCE CARS")){
                                if(e.target.value < 2000) return e.target.style.outline = 
                                "2px solid red"
                            }
                            return e.target.style.outline = "transparent"
                        }}
                        onChange={e=>{
                            setProduct(p=>({...p, engineSize: e.target.value}))
                        }}
                    />
                </div>
                <div>
                    <label>Mileage</label>
                    <input 
                        className='input1'
                        placeholder='Mileage'
                        type='number'
                        value={product.mileage}
                        onChange={e=>setProduct(p=>({...p, mileage: e.target.value}))}
                    />
                </div>
                {product.category.includes("PERFORMANCE CARS") && 
                <>
                    <div>
                        <label>Transmission</label>
                        <select required value={product.transmission} onChange={e=>setProduct(p=>({...p, transmission: e.target.value}))}>
                            <option value='Manual'>Manual</option>
                            <option value='Automatic'>Automatic</option>
                            <option value='Semi-Automatic'>Semi-Automatic</option>
                        </select>
                    </div>
                    <div>
                        <label>Power Output</label>
                        <input 
                            required
                            className='input1'
                            placeholder='Power Output (Horse Power)'
                            type="number"
                            value={product.powerOutput}
                            onChange={e=>setProduct(p=>({...p, powerOutput: e.target.value}))}
                        />
                    </div>
                    <div>
                        <label>Current Turbo</label>
                        <input 
                            className='input1'
                            placeholder='Current Turbo/Turbos'
                            value={product.currentTurbo}
                            onChange={e=>setProduct(p=>({...p, currentTurbo: e.target.value}))}
                        />
                    </div>
                    <div>
                        <label>Drivetrain</label>
                        <select required value={product.driveTrain} onChange={e=>setProduct(
                            p=>({...p, driveTrain: e.target.value})
                        )}>
                            <option value='AWD'>All Wheel Drive</option>
                            <option value='RWD'>Rear Wheel Drive</option>
                            <option value='FWD'>Front Wheel Drive</option>
                        </select>
                    </div>
                </>
                }
            </>
            }
            

            {(product.category.includes("WHEELS") || product.category.includes("TYRES")) && 
            <div>
                <label>Size</label>
                <input  
                    className='input1'
                    placeholder={'Size of ' + product.category.toLocaleLowerCase()}
                    value={product.size}
                    onChange={e=>setProduct(p=>({...p, size: e.target.value}))}
                />
            </div>}
            {product.category.includes("WHEELS") && <>
                <div>
                    <label>Wheel ET</label>
                    <input 
                        className='input1'
                        placeholder='Wheel ET'
                        value={product.ET}
                        onChange={e=>setProduct(p=>({...p, ET: e.target.value}))}
                    />
                </div>
                <div>
                    <label>PCD</label>
                    <input 
                        className='input1'
                        placeholder='Wheel PCD'
                        value={product.pcd}
                        onChange={e=>setProduct(p=>({...p, pcd: e.target.value}))}
                    />
                </div>
            </> }



            {product.category.includes("PARTS") && <div>
                <label>Part Number</label>
                <input 
                    className='input1'
                    placeholder='Part NUmber'
                    value={product.partNumber}
                    onChange={e=>setProduct(p=>({...p, partNumber: e.target.value}))}
                />
            </div>}
            <div>
                <label>Condition</label>
                <select className='select1' onChange={e=>setProduct(p=>({...p, isUsed: e.target.value}))}>
                    <option value={true}>New</option>
                    <option value={false}>Used</option>
                </select> 
            </div>
            <div>
                <label>Location</label>
                <input 
                    className='input1'
                    placeholder='Location'
                    value={product.location}
                    onChange={e=>setProduct(p=>({...p, location: e.target.value}))}
                />
            </div>
        </>}

        {getIsService() && <>
                <div>
                    <label>Business Name</label>
                    <input 
                        className='input1'
                        placeholder='Name of your garage'
                        value={garage.name}
                        onChange={e=>setGarage(p=>({...p, name: e.target.value}))}
                    />
                </div>
                <div>
                    <label>Business Location</label>
                    <input 
                        className='input1'
                        placeholder='Where is your garage Located?'
                        value={garage.location}
                        onChange={e=>setGarage(p=>({...p, location: e.target.value}))}
                    />
                </div>
                <div>
                    <label>Business Contacts</label>
                    <input 
                        className='input1'
                        placeholder='If more than 1 contact, separate by comma'
                        value={garage.contacts}
                        onChange={e=>setGarage(p=>({...p, contacts: e.target.value}))}
                    />
                </div>
        </>}
        <div>
            <label>Description</label>
            <textarea value={product.description}
                placeholder={product.category.includes("PERFORMANCE CARS") ?  
                 "Describe any other modifications "
                :"Anything else you want buyers to know?"}
                onChange={e=>setProduct(p=>({...p, description: e.target.value}))}
            />
        </div>

        <button className='button1' type='submit'
            
        >
            Add to catalogue
        </button>
    </form>
  )
}

export default AddProductForm
