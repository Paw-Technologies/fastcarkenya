import React from 'react'
import './sub.css'
import AddProductForm from '../Components/AddProductForm'
import { useLocation } from 'react-router-dom'
import MyCatalogue from '../Components/MyCatalogue'
import AddEventForm from '../Components/AddEventForm'

const MyProducts = () => {
  const lokeshen = useLocation()

  if(window.innerWidth < 600){
    if(lokeshen.pathname.includes("add")) return <AddProductForm />
    if(lokeshen.pathname.includes('addevent')) return <AddEventForm />
  }
  return (
    <div className='subPage' id='addprod'>
      <section>
      <h1 className='h1'>Add Product</h1>
        <AddProductForm />
      </section>
      <section>
        <MyCatalogue />
      </section>
    </div>
  )
}

export default MyProducts
