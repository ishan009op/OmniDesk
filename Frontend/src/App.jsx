import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Main/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Main/Footer'

function App() {
  

  return (
    <>
    <div className='flex flex-col min-h-screen'>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default App
