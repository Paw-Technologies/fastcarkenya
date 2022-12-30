import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import api2 from '../apis/api2'
import Filters from '../Components/Filters'
import ShowProduct from '../Components/ShowProduct'
import ShowService from '../Components/ShowService'
import Spinner from '../Components/Spinner'
import CategoryView from './CategoryView'

const SearchPage = () => {
    const fromLink = useLocation()
    const keepList = useRef([])
    const [searchTerm, setTerm] = useState("")
    const [list, setList] = useState([])

    const find = async() =>{
      let term = fromLink.state.searchTerm || searchTerm
      await api2.post('/find', {term: term})
      .then(res=>{
        setList(res.data.list)
        keepList.current = res.data.list
      }, ({response})=>{
        
      })
      .catch(err=>{
        
      })
    }


    useEffect(()=>{
        try {
            setTerm(fromLink.state.searchTerm)
            find()
        } catch (error) {
            
        }
    }, [])

    const isService = (prod) =>{
      return (prod.category.includes("WRAP SHOPS") || prod.category.includes("PAINT/BODY SHOP") || prod.category.includes("GARAGES"))
    }

  return (
    <div className='page' id="categoryView">
      <Filters list={list} modify={setList} permanent={keepList.current} />
      <div className='listItems'>
        {(list.length < 1 && keepList.current.length < 1) && <Spinner />}

        {(list.length < 1 && keepList.current.length > 0) && <h1 className='h1'>
          No product/service matches the specs</h1>}

        {list.length > 0 && list.map(product=>{
          if(isService(product))return <ShowService 
            key={product._id}
            service={product}
          />
          return <ShowProduct 
            key={product._id}
            product={product}
          />
        })}
      </div>
    </div>
  )
}

export default SearchPage
