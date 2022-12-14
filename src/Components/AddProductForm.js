import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { json } from 'react-router-dom'
import api2 from '../apis/api2'
import useUserData from '../customHooks/useUserData'
import { useUserId } from '../customHooks/useUserId'
import './comp.css'
import ImageUpload from './ImageUpload'
import Spinner from './Spinner'

const AddProductForm = () => {
    const [userDetails] = useUserData()
    const [spin, setSpin] = useState(false)
    const categories = useSelector(state=>state.clientSlice.categories)
    let formdata = new FormData()
    const [countries, setCountries] = useState([])

    const [product, setProduct] = useState({
        images: [],
        coverImg: "",
        category: "null",
        brandName: "",
        model: "",
        country: "",
        city: "",
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
        type: ""
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
        country: "",
        city: "",
        contacts: ""
    })

    const sendProduct = async(e) =>{
        e.preventDefault()
        formdata.append('category', product.category)
        formdata.append('seller', JSON.stringify(userDetails))
        formdata.append("description", product.description)
        formdata.append('country', garage.country)
        formdata.append('city', garage.city)
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
            formdata.append('type', product.type)
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
            if(res.data.needPay){
                alert('You do not have enough credits to post this product, you will be redirected to a payout page, pay then try again')
                return window.open(res.data.url,'_blank')
            }
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

    const getCountry = async(value) =>{
        await axios.get(`https://restcountries.com/v2/name/${value}`)
        .then(res=>{
            let newList = []
            newList.push(res.data[0].name)
            setCountries(newList)
        }, ({response})=>{
            console.log(response.status)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    let countryDatalist = <datalist id='countries'>
        {countries.map(cntry => <option key={cntry} value={cntry}>{cntry}</option>)}
    </datalist>

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
            {!product.category.includes('APPAREL') && 
            <>
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
            
            {(product.category.includes("CARS") || product.category.includes("MOTORBIKES")) && 
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
            </>
           } 
           {product.category.includes('APPAREL') && 
           <>
            <div>
                <label>Type</label>
                <input 
                    className='input1'
                    placeholder='type'
                    list='apparels'
                    value={product.type}
                    onChange={e=>setProduct(p=>({...p, type: e.target.value}))}
                />
                <datalist id='apparels'>
                    <option value={'Tops'}>Tops</option>
                    <option value={'Hats'}>Hats</option>
                    <option value={'Sweat Pant'}>Sweat Pant</option>
                    <option value={'Hoodie'}>Hoodie</option>
                    <option value={'Watch'}>Watch</option>
                    <option value={'T-Shirts'}>T-Shirts</option>
                </datalist>
            </div>
            <div>
                <label>Size</label>
                <select value={product.size} onChange={e=>setProduct(
                    p=>({...p, size: product.size})
                )}>
                    <option value={'Small'}>Small</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'Large'}>Large</option>
                    <option value={'XL'}>XL</option>
                    <option value={'2XL'}>2XL</option>
                    <option value={'3XL'}>3XL</option>
                </select>
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
           </>}
           <div>
                <label>Country</label>
                <select className='input1' value={product.country} onChange={e=>setProduct(p=>({...p, country: e.target.value}))}>
                    <option value='Kenya'>Kenya</option>
                    <option value='Tanzania'>Tanzania</option>
                    <option value='Uganda'>Uganda</option>
                    <option value='Zambia'>Zambia</option>
                    <option value='South Africa'>South Africa</option>
                    <option value='United Arab Emirates'>United Arab Emirates</option>
                </select>
                {/* <input 
                    className='input1'
                    placeholder='Country'
                    value={product.country}
                    onChange={e=>{
                        setProduct(p=>({...p, country: e.target.value}))
                        getCountry(e.target.value)
                    }}
                />
                {countryDatalist} */}
            </div>
            <div>
                <label>City/Town</label>
                <input 
                    className='input1'
                    placeholder='City/Town'
                    value={product.city}
                    onChange={e=>setProduct(p=>({...p, city: e.target.value}))}
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
                    <label>Location(Country)</label>
                    <input 
                        className='input1'
                        placeholder='Country'
                        value={garage.country}
                        onChange={e=>setGarage(p=>({...p, country: e.target.value}))}
                    />
                </div>
                <div>
                    <label>Location(City)</label>
                    <input 
                        className='input1'
                        placeholder='City'
                        value={garage.city}
                        onChange={e=>setGarage(p=>({...p, city: e.target.value}))}
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
            Upload Product
        </button>
    </form>
  )
}

export default AddProductForm
