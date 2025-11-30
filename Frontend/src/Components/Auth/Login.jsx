import React,{useState} from 'react'
import axios from 'axios'
const Login = () => {

    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')

const add=async()=>{
     if (!Email || !Password) {
      alert('Please enter both email and password.');
      return;
    }
    
    try{
        const res= await axios.post('http://localhost:3000/api/auth/login',{
        email:Email,
        password:Password
    })

    localStorage.setItem('omniToken',res.data.token)
    localStorage.setItem('omniUser',JSON.stringify(res.data.user))

    console.log(res.data.token)}
    catch(err){
        console.log(err.message);
        
    }
}

  return (
    <>
    <input type="text" value={Email} onChange={(e)=> setEmail(e.target.value)} />
<input type="text" value={Password} onChange={(e)=> setPassword(e.target.value)}  />
<button onClick={add}>Login</button>
    </>
  )
}

export default Login