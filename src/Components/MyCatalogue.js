import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api2 from '../apis/api2'
import api3 from '../apis/api3'
import './comp.css'
import { useUserId } from '../customHooks/useUserId'
import ShowProduct from './ShowProduct'
import Spinner from './Spinner'
import EditProduct from './EditProduct'

const MyCatalogue = () => {
  const { rtUserId } = useUserId()
  const [message, setMessage] = useState("")
  const [isProd, setIsProd] = useState(true)
  const [user_products, setUserProd] = useState([])
  const user_events = useMemo(()=>get_cata(false), [])
  

  async function get_cata(){
    await api2.get('/myproducts',  {headers: { userId: rtUserId() }})
    .then(res=>{
      setUserProd(res.data.products)
    }, ({response})=>{
      setMessage(response.data.message)
    })
    .catch(({response})=>{
      setMessage(response.data.message)
    })
  }
  
  useEffect(()=>{
    get_cata()
  }, [])

  const remove = (id) =>{
    let list = user_products.filter(p=>p._id !== id)
    setUserProd(list)
  }

  return (
    <div className='myCatalogue'>
      {message && <h1>{message}</h1>}
      {message &&  <h3>{<Spinner />}</h3>}
      {!message && <div className='list'>
        {user_products.map(prod=><EditProduct 
          key={prod._id}
          product={prod}
          remove={remove}
        />)}
        
      </div>}
    </div>
  )
}

export default MyCatalogue
