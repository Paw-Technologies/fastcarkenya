import React, { useEffect, useState } from 'react'
import { MdCall, MdChat } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import BuyproductForm from '../Components/BuyproductForm'
import ImageViewer from '../Components/ImageViewer'
import Spinner from '../Components/Spinner'
import './page.css'
import ReviewList from '../Components/ReviewList'

const ViewToBuy = () => {
    const navigate = useNavigate()
    const lokeshen = useLocation()
    const services = ['GARAGES', 'PAINT/BODY SHOPS', 'WRAP SHOPS']
    const [product, setProduct] = useState(null)
    
    
    useEffect(()=>{
        try {
            if (typeof(lokeshen.state.product) === 'undefined') return navigate('../')
            setProduct(lokeshen.state.product)
            //console.log(lokeshen.state.product)
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

                    {product.category.includes("CARS FOR SALE") && 
                    <>
                        <div>
                            <p>Engine Size: </p><h2>{product.engineSize}cc</h2>
                        </div>
                        <div>
                            <p>Year: </p><h2>{product.year}</h2>
                        </div>
                    </>}
                    <div>
                        <p>Location: </p><h2>{product.location}</h2>
                    </div>
                </div>
            </>
            }
            {services.includes(product.category) && <>
                <div>
                    <h1 className='h1'>{product.name}</h1>
                </div>
            </>}
            <div className='desc'>
                <em>{product.description}</em>
            </div>
            <div>
                <button className='button1' >
                    Call Seller <MdCall />
                </button>
                <button className='button1' onClick={()=>navigate('/dashboard/messages', {state: {seller: product.seller}})}>
                    Start a chat <MdChat />
                </button>
            </div>

            {services.includes(product.category) && <>
            <h1 className='h1'>Reviews</h1>
                <ReviewList />
            </>}
            
        </section>
    </div>
  )
}

export default ViewToBuy
