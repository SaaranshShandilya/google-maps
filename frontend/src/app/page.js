"use client"

import Image from "next/image";
import { useState, useRef } from "react";
import Link from 'next/link'
import axios from "axios";
import { useRouter } from 'next/navigation'
 


export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const router = useRouter()

  const login = ()=>{
    axios.post("http://localhost:8080/v1/users/login",{
      "email":email,
      "password":password
    })
    .then((response)=>{
      console.log(response)
      if(response.status == 200){
        localStorage.setItem("id",response.data.id)
        router.push("/maps")
      }
      else{
        alert('Wrong email or password')
      }
    })
    .catch((error)=>{
      console.error(error)
    })
  }
  return (
    <>
    <div className={`bg-[url(/earth.jpg)] min-h-screen bg-cover`} >
      <div className="w-1/2 flex flex-col items-center justify-center space-y-8 h-full min-h-screen bg-black bg-opacity-10 backdrop-blur-2xl">
        <div className="space-y-3 text-center my-3">
        <p className="text-3xl font-semibold">Welcome, User</p>
        <p>Please enter your login details to continue</p>
        </div>
        <div className="w-1/2 mx-auto text-center">
        <p className="text-left">Email</p>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full outline-none px-2 py-2 text-black rounded-lg " type="email"></input>
        </div>
        <div className="w-1/2  mx-auto text-center">
        <p className="text-left">Password</p>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full outline-none px-2 py-2 text-black rounded-lg " type="password"></input>
        </div>
        <p>Not an existing user? <Link href="/signup">
        Signup now.
        </Link> </p>
        <button onClick={()=>{login()}} className="bg-transparent  outline-none border-2 font-semibold border-white rounded-2xl px-8 hover:bg-white hover:text-black hover:scale-110 transition-all py-2">Move forward</button>
      </div>
    </div>
    </>
  );
}
