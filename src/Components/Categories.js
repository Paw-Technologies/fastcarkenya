import React, { useState } from 'react'
import Category from './Category'
import { useSelector } from 'react-redux'

const Categories = () => {
    const [count, setCount] = useState(3)
    const categories = useSelector(state=>state.clientSlice.categories)
  return (
    <div className='categoryBanner'>
        <div className='category'>
            {categories.map((c, index)=><Category 
                    key={index}
                    name={c.n}
                    icon={c.i}
                /> 
            )}
        </div>
    </div>
  )
}

export default Categories
