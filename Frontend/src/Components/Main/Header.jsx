import React from 'react'
import logo from "../../img.png"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate=useNavigate()
  return (
    <>
    <div className='bg-white m-3 rounded-lg flex border border-blue-200 justify-between px-10'>
      <div className="left ">
        <img src={logo} alt="error" className='h-40 w-40' />
      </div>
      <div className="right flex items-center pr-32 gap-10">
<NavLink to='/' className='text-2xl font-semibold'>Home</NavLink>
<NavLink onClick={()=>{navigate('/task')}} className='text-2xl font-semibold'>Tasks</NavLink>
<NavLink to='/notes' className='text-2xl font-semibold'>Notes</NavLink>
<NavLink to='/bookmark' className='text-2xl font-semibold'>Bookmarks</NavLink>
<NavLink to='/finance' className='text-2xl font-semibold'>Finance</NavLink>
<NavLink className='text-2xl font-semibold'>Contact us</NavLink>
      </div>
    </div>
    </>
  )
}

export default Header