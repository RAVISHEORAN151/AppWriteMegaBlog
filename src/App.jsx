
import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom';
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";




function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch() 

 useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      }
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
  
  
 
  return !loading ? (
    <div className="m-1 overflow-hidden rounded-2xl bg-slate-950 p-1">
  <div className="block w-full">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
</div>
  ) : null;
}

export default App
