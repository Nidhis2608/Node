import { useEffect } from 'react'

const Notes = () => {
  useEffect(()=>{
     fetch("https://wicked-calf-loincloth.cyclic.app/notes",{
      headers:{
        "Content-type":"application/json",
        authorization:`Bearer ${localStorage.getItem("token")}`
      }
     }).then(res=>res.json())
     .then(data=>console.log(data))
     .catch(err=>console.log(err))
  },[]);
  return (
    <h3>Notes dashboard: Check in Console</h3>
  )
}

export default Notes