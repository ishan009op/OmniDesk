import React, { useState } from 'react'
import axios from 'axios'
const Register = () => {

const add=()=>{
    axios.post('http://localhost:3000/api/auth/register',{
        name:Name,
        email:Email,
        password:Password
    })
    alert("success")
}

const [Name,setName]=useState('')
const [Email,setEmail]=useState('')
const [Password,setPassword]=useState('')

  return (
    <>

<input type="text" value={Name} onChange={(e)=> setName(e.target.value)} />
<input type="text" value={Email} onChange={(e)=> setEmail(e.target.value)} />
<input type="text" value={Password} onChange={(e)=> setPassword(e.target.value)}  />
<button onClick={add}> Register</button>
    </>
  )
}

export default Register