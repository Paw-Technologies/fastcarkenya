import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Filters from '../Components/Filters'
import ShowProduct from '../Components/ShowProduct'
import ShowService from '../Components/ShowService'
import { useCategoryTerm } from '../customHooks/useCategoryTerm'

const CategoryView = () => {
    const lokeshen = useLocation()
    let { categoryTerm, setCategTerm } = useCategoryTerm()
    const services = ['GARAGES', 'WRAP SHOPS', 'BODY/PAIN SHOPS']
    const [list, setList] = useState([])
    const perm = useRef([])
    const getList = useSelector(state=>state.clientSlice.globalProducts)
    
    
    useEffect(()=>{
      // fetch product name
      setCategTerm(lokeshen.state.category)
      setList(getList.filter(p=>p.category.includes(lokeshen.state.category)))
      perm.current = getList
    }, [])
  return (
    <div className='page' id='categoryView'>
        <Filters list={list} modify={setList} permanent={perm.current}  />
        <div className='listItems'>
          {list.length < 1 && <h1>No products under this category</h1>}
          {list.length > 0 && 
            list.map(item=>{
              if(services.includes(item.category)) return <ShowService  
                key={item._id}
                service={item}
              />
              return <ShowProduct 
                key={item._id}
                product={item}
              />
          })}
        </div>
    </div>
  )
}

export default CategoryView
