import React, { useState } from 'react'
import Category from './Category'
import car from '../images/car.png'
import wheel from '../images/wheel.png'
import parts from '../images/parts.png'
import garage from '../images/garage.png'
import paint from '../images/paint.png'
import batt from '../images/batt.png'
import acc from '../images/acc.png'
import wrap from '../images/wrap.png'
import tyres from '../images/Tyres.png'

const Categories = () => {
    const [count, setCount] = useState(3)
    const list = [
        {n: "WHEELS", i: wheel},
        {n: "CARS FOR SALE", i: car},
        {n: "PARTS", i: parts},
        {n: "GARAGES", i: garage},
        {n: "PAINT/BODY SHOP", i: paint},
        {n: "TYRES", i: tyres},
        {n: "ACCESSORIES", i: acc},
        {n: "WRAP SHOPS", i: wrap},
        {n: "BATTERIES", i: batt}
    ]
  return (
    <div className='categoryBanner'>
        <div className='category'>
            {list.map((c, index)=><Category 
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
