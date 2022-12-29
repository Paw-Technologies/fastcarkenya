import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import MainNav from './Components/MainNav';
import SearchPage from './Pages/SearchPage';
import AuthPage from './Pages/AuthPage';
import { useDispatch } from 'react-redux';
import { fetch_events, log_in } from './Store.js/store';
import UserDashboard from './Pages/UserDashboard';
import FootNav from './Components/FootNav';
import CategoryView from './Pages/CategoryView';
import ViewToBuy from './Pages/ViewToBuy';
import api2 from './apis/api2';





function App() {
  const loadCount = useRef(0)
  const dispatch = useDispatch()
  let location = useLocation()

  useEffect(()=>{
    const fetchEvents = async() =>{
        await api2.get('/getevents', {headers: {userid: localStorage.getItem('userId')}})
        .then(res=>{
            dispatch(fetch_events(res.data.events))
        })
        .catch(err=>{
            alert(err.message)
        })
    }

    if(loadCount.current < 2){
      dispatch(log_in())
      fetchEvents(fetch_events())
    }
  }, [dispatch])
//TODO //add accessory
  return (
    <div className="App">
      {(!location.pathname.includes('dashboard') || window.innerWidth > 600) && <MainNav />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/category/*' element={<CategoryView />} />
        <Route exact path='/search' element={<SearchPage />} />
        <Route exact path='/auth' element={<AuthPage />} />
        <Route exact path='/dashboard/*' element={<UserDashboard />} />
        <Route exact path='/product' element={<ViewToBuy />} />
      </Routes>
      {window.innerWidth < 600 && <FootNav />}
    </div>
  );
}

export default App;
