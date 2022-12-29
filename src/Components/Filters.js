import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './comp.css'

const Filters = (props) => {
    let isPhone = () => window.innerWidth < 600
    let list = props.list
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState({
        low: "",
        high: "",
        lowHigh: null,
    })
    
    const [year, setYear] = useState({
        from: "",
        to: "",
        oldNew: null
    })

    const [used, setUsed] = useState("")


    useEffect(()=>{
        if(price.low === "" && price.high === "" && price.lowHigh === null
        && year.from === "" && year.to === "" && year.oldNew === null){
            props.modify(props.permanent)
        }
    }, [price, year, used])



    const filterPrice = (low=null, high=null, lowHigh=false) =>{
        let holder = []
        if(low !== null){
            if(props.list.length > 0){
                holder = props.list.filter(p=>p.price >= low)
                return props.modify(holder)
            }
            holder = props.permanent.filter(p=>p.price >= low)
            return props.modify(holder)
        }
        if(high !== null){
            if(props.list.length > 0){
                holder = props.list.filter(p=>p.price <= high)
                return props.modify(holder)
            }
            holder = props.permanent.filter(p=>p.price <= high)
            return props.modify(holder)
        }
        if(lowHigh){
            return 
        }
    }

    const filterYear = (from=null, to=null, oldNew=false) => {
        let holder = []
        if(from !== null){
            // save year as a string and convert to int here
            if(props.list.length > 0){
                holder = props.list.filter(p=>p.year >= Number(year.from))
                return props.modify(holder)
            }
            holder = props.permanent.filter(p=>p.year >= Number(year.to))
            return props.modify(holder)
        }
        if(to !== null){
            if(props.list.length > 0){
                holder = props.list.filter(p=>p.year <= Number(year.from))
                return props.modify(holder)
            }
            holder = props.permanent.filter(p=>p.year <= Number(year.to))
            return props.modify(holder)
        }        
    }
    
    const condition = (brand=null, used=null, both=true) =>{
        let holder = []
        if(brand !== null){
            if(props.list.length > 0){
                holder = props.list.filter(p=>p.isUsed === brand)
                return props.modify(list)
            }
            holder = props.permanent.filter(p=>p.isUsed === brand)
            return props.modify(holder)
        }
        if(used !== null){
            if(props.list.length > 0){
                holder = props.list.filter(p=>p.isUsed === used)
                return props.modify(list)
            }
            holder = props.permanent.filter(p=>p.isUsed === used)
            return props.modify(holder)
        }
        if(props.list.length > 0){
            return props.modify(props.list)
        }
        return props.modify(props.permanent)
    }
  return (
        <div className='filters'>
            {isPhone() && <button className='button1' style={{
                marginTop: "3%"
            }} onClick={()=>setShow(!show)}>Filters & Search</button>}

            <>{
                (!isPhone() || show) &&
                <>
                {/* <span className='search'>
                    <FaSearch className='icon' />
                    <input className='input1' 
                        placeholder='Search in this category'
                    />
                </span> */}
                
                <div className='subFilters'>
                    <label>Filter by: </label>
                    <label>Price Range</label>
                    <span>
                        <input placeholder='From' 
                            value={price.low}
                            onChange={e=>{
                                setPrice(p=>({...p, low: e.target.value}))
                                filterPrice(e.target.value)
                            }}
                        />
                        <input placeholder='To' 
                            value={price.high}
                            onChange={e=>{
                                setPrice(p=>({...p, high: e.target.value}))
                                filterPrice(null, e.target.value)
                            }}
                        />
                    </span>
                    
                    <label>Manufacturing Year</label>
                    <span>
                        <input placeholder='From' 
                            value={year.from}
                            onChange={e=>{
                                setYear(p=>({...p, from: e.target.value}))
                                filterYear(e.target.value)
                            }}
                        />
                        <input placeholder='To' 
                            value={year.to}
                            onChange={e=>{
                                setYear(p=>({...p, to: e.target.value}))
                                filterYear(null, e.target.value)
                            }}
                        />
                    </span>

                    <label>Brand New/Used</label>
                    <span>
                        <span>
                            <input value={used} type='checkbox' onChange={e=>{
                                setUsed(e.target.checked)
                                condition(e.target.checked)
                            }} />
                            <p>Brand New</p>
                        </span>
                        <span>
                            <input type='checkbox' value={used} onClick={e=>{
                                setUsed(!e.target.checked)
                                condition(null, !e.target.checked)
                            }}
                            />
                            <p>Used</p>
                        </span>
                        <span>
                            <input type='checkbox' />
                            <p>All</p>
                        </span>
                    </span>    
                    {isPhone() && <button className='button1'
                        onClick={()=>setShow(false)}
                    >Save</button>}                                       
                </div>
                </>
            }
            </>
        </div>
  )
}

export default Filters
