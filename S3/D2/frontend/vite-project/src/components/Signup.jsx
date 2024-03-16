import React, { useState } from 'react'

const Signup = () => {
    const [username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const handleSubmit=()=>{
        const payload={
            username,email,password
        }
        fetch("https://wicked-calf-loincloth.cyclic.app/users/register",{
            method:"POST",
            headers:{
               " Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then(res=>res.json())
          .then((data)=>{
            console.log(data)
            localStorage.setItem("token",data.token)
        })
          .catch(err=>console.log(err))
    }

  return (
    <>
     <h3>Signup Page</h3>
     <input type="text" placeholder='Username...' value={username} onChange={(e)=>setUsername(e.target.value)}/>
     <input type="email" placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)}/>
     <input type="password" placeholder='Password...' value={password} onChange={(e)=>setPassword(e.target.value)}/>
     <button onClick={handleSubmit}>Register</button>
    </>
  )
}

export default Signup