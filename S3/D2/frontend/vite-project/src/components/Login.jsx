import React, { useState } from 'react'

const Login = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const handleSubmit=()=>{
        const payload={
            email,password
        }
        fetch("https://wicked-calf-loincloth.cyclic.app/users/login",{
            method:"POST",
            headers:{
               " Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then(res=>res.json())
          .then(data=>console.log(data))
          .catch(err=>console.log(err))
    }
  return (
    <>
     <h3>Login Page</h3>
     <input type="email" placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)}/>
     <input type="password" placeholder='Password...' value={password} onChange={(e)=>setPassword(e.target.value)}/>
     <button onClick={handleSubmit}>Login</button>
    </>
  )
}

export default Login