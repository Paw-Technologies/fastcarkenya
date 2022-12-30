import React from 'react'
// import './comp.css' --- check under mobile
import { FaHome, FaList, FaPlus } from 'react-icons/fa'
import { MdAccountCircle, MdNoAccounts, MdOutlineMessage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const FootNav = () => {
    const navigate = useNavigate()

    const handleClick = (path) =>{
        navigate(path)
    }
  return (
    <div className='footNav'>
        <div>
            <button className='iconBtn1' name="/"
                onClick={()=>handleClick('/')}
            >
                <FaHome />
            </button>
            <p>Home</p>
        </div>
        <div>
           <button className='iconBtn1' name='/dashboard/messages'
                onClick={()=>handleClick("/dashboard/messages/chatlist")}
            >
                <MdOutlineMessage />
            </button> 
            <p>Messages</p>
        </div>
        <div>
            <button className='iconBtn1' name='/dashboard/add'
                onClick={e=>handleClick("/dashboard/addproduct")}
            >
                <FaPlus />
            </button>
            <p>Post</p>
        </div>
        <div>
            <button className='iconBtn1' name='/dashboard/orders'
                onClick={e=>handleClick("/dashboard/productcatalogue")}
            >
                <FaList />
            </button>
            <p>Catalogue</p>
        </div>
        <div>
            <button className='iconBtn1' name='/dashboard/account'
                onClick={e=>handleClick("/dashboard/account")}
            >
                <MdAccountCircle />
            </button>
            <p>Account</p>
        </div>
    </div>
  )
}

export default FootNav
