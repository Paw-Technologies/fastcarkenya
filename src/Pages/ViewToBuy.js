import React, { useEffect, useState } from 'react'
import { MdCall, MdChat } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import BuyproductForm from '../Components/BuyproductForm'
import ImageViewer from '../Components/ImageViewer'
import Spinner from '../Components/Spinner'
import './page.css'
import ReviewList from '../Components/ReviewList'
import Rate from '../Components/Rate'
import api2 from '../apis/api2'
import { useUserId } from '../customHooks/useUserId'

const services = ['GARAGES', 'PAINT/BODY SHOPS', 'WRAP SHOPS']
const stars = ['⭐', '⭐', '⭐', '⭐', '⭐']

const ViewToBuy = () => {
    const { rtUserId } = useUserId()
    const navigate = useNavigate()
    const lokeshen = useLocation()
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState("")
    
    async function getRating(){
        await api2.get('/getrating', {headers: {product: lokeshen.state.product._id}})
        .then(res=>{
            setRating(res.data.rating)
            return
        }, ({response})=>{
                
        })
        .catch(err=>{
            setRating('Not rated Yeeet')
        })
    }
    
    useEffect(()=>{
        if(typeof(lokeshen.state.product) === 'undefined') return
        if(services.includes(lokeshen.state.product.category)){
            getRating()
        }
    }, [])

    console.log(product.transmission)
    useEffect(()=>{
        try {
            if (typeof(lokeshen.state.product) === 'undefined') return navigate('../')
            setProduct(lokeshen.state.product)

        } catch (error) {
            navigate('/')
        }
    }, [])

    if(product === null || typeof(product)==='undefined') return <div style={{width: '100%', height: "90vh"}}>
        <Spinner />
        <h1>Hello world</h1>
    </div> 
  return (
    <div className='page' id='viewToBuy' >
        <ImageViewer images={product.images} />  
        <img src={""} />
        <section className='buySection'>

            {!services.includes(product.category) && <>
                <div className='buyDetails'>
                    <div>
                        <p>Brand: </p><h2>{product.brandName}</h2>
                    </div>
                    <div>
                        <p>Model: </p><em>{product.model}</em>
                    </div>
                    <div>
                        <p>Price: </p><h2>Ksh.{product.price}</h2>
                    </div>
                    <div>
                        <p>Status: </p><h2>{product.used ? "Used" : "Brand New"}</h2>
                    </div>
                    
                    {(product.category.includes("WHEELS") || product.category.includes("TYRES")) && 
                        <div>
                            <p>Size: </p><h2>{product.size}</h2>
                        </div>
                    }
                    {product.category.includes("WHEELS") && <>
                        <div>
                            <p>CB: </p><h2>{product.cb}</h2>
                        </div>
                        <div>
                            <p>ET: </p><h2>{product.ET}</h2>
                        </div>
                        <div>
                            <p>PCD: </p><h2>{product.pcd}</h2>
                        </div>
                    </>}

                    {(product.category.includes("CARS FOR SALE") || 
                    product.category.includes("PERFORMANCE CARS")) && 
                    <>
                        <div>
                            <p>Engine Size: </p><h2>{product.engineSize}cc</h2>
                        </div>
                        <div>
                            <p>Year: </p><h2>{product.year}</h2>
                        </div>
                        <div>
                            <p>Transmission: </p><h2>{product.transmission}</h2>
                        </div>
                    </>}
                    {product.category.includes("PERFORMANCE CARS") && <>
                        <div>
                            <p>Power Output</p> <h2>{product.powerOutput}hp </h2>
                        </div>
                        <div>
                            <p>Turbo: </p> <h2>{product.currentTurbo}</h2>
                        </div>
                    </>}
                    <div>
                        <p>Country: </p><h2>{product.country}</h2>
                    </div>
                    <div>
                        <p>City: </p><h2>{product.city}</h2>
                    </div>
                </div>
            </>
            }
            {services.includes(product.category) && <>
                <div>
                    <h1 className='h1'>{product.name}</h1>
                    <h3>Rating: {rating > 0 ? stars.slice(0, rating)+`(${rating})` : 'Not rated yet'}</h3>
                </div>
            </>}
            <div className='desc'>
                <em>{product.description}</em>
            </div>

            {/* hide the buttons below if the ad is being visited
             by the seller
             */}
            
            {product.seller !== rtUserId() && <>
                <div>
                    <button className='button1' >
                        Call Seller <MdCall />
                    </button>
                    <button className='button1' onClick={()=>{
                            if(window.innerWidth > 599) return navigate('/dashboard/messages', {state: {seller: product.seller}})
                            return navigate('/dashboard/messages/openchat', {state: {seller: product.seller}})
                    }
                    }>
                        Start a chat <MdChat />
                    </button>
                </div>
                <Rate product={product._id} />
            </>}
            {/* {services.includes(product.category) && <>
            <h1 className='h1'>Reviews</h1>
                <ReviewList />
            </>} */}
            
        </section>
    </div>
  )
}

export default ViewToBuy
