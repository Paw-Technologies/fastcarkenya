import React from 'react'
import './comp.css'
import { GrCatalog } from 'react-icons/gr'
import CompanyIcon from './CompanyIcon'
import DashBtn from './DashBtn'
import { useLocation } from 'react-router-dom'


const DashboardNav = () => {
  const location = useLocation()


  if (window.innerWidth < 600) {
    return <nav className='dashNav'>
      <CompanyIcon />
      {(window.innerWidth < 600 && location.pathname.includes("add")) && <DashBtn text={"Post Product"} path={"addproduct"} />}
      {(window.innerWidth < 600 && location.pathname.includes("add")) && <DashBtn text={"Post Event"} path={"addevent"} />}

      {(window.innerWidth < 600 && location.pathname.includes("catalogue")) &&
        <>
          <DashBtn text={"Products"} path={"productcatalogue"} 
            state={true}
          />
          <DashBtn text={"Events"} path={"eventcatalogue"} 
            state={false}
          />
        </>
      }
      
      {(window.innerWidth < 600 && location.pathname.includes("messages")) && 
      <DashBtn text={"msg"} />}
    </nav>
  }
}

export default DashboardNav
