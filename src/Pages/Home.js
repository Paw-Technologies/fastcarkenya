import React, { useEffect } from 'react'
import './page.css'
import HomeTopNav from '../Components/HomeTopNav'
import TopProducts from '../Components/TopProducts'
import Footer from '../Components/Footer'
import Categories from '../Components/Categories'
import { useDispatch } from 'react-redux'
import api2 from '../apis/api2'
import { Cookies, useCookies } from 'react-cookie'
import { add_to_global_products } from '../Store.js/store'
import TopShops from '../Components/TopShops'
import Allevents from '../Components/Allevents'

const Home = () => {
  const cookie = new Cookies()
  const dispatch = useDispatch()

  async function fetchProducts(){
    await api2.get('', {params: {id: cookie.get('userId')}}, {headers: {
      Authorization: "Bearer " + cookie.get('accessTkn')
    }})
    .then(resp=>{
      // send to redux
      dispatch(add_to_global_products(resp.data.data.data)) 
    }, ({response})=>{
      
    })
    .catch(({response})=>{
        
    })
}
  useEffect(()=>{
      fetchProducts()
  }, [])

  return (
    <div className="page" id='home'>
        <HomeTopNav />
        <h1 className='h1'>Categories</h1>
        <Categories />
        <h1 className='h1'>Top Products</h1>
        <TopProducts />
        <h1 className='h1'>Top Shops</h1>
        <TopShops />
        <h1 className='h1'>Automotive Events</h1>
        <Allevents />
        <Footer />
    </div>
  )
}

export default Home
