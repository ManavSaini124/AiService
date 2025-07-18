"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"; 

const {Button} = require("@/components/ui/button")
const {Input} = require("@/components/ui/input")

export default function Home() {
  const { data: session, } = authClient.useSession() 

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError:()=>{
        window.alert("error")
      },
      onSuccess:()=>{
        window.alert("success")
      }
    });
  }
  const onLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
    },{
      onError:()=>{
        window.alert("error")
      },
      onSuccess:()=>{
        window.alert("success")
      }
    });
  }
  console.log(session)

  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>

      </div>
    )
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <div className="p-4 flex flex-col gap-y-4">
        <Input 
          placeholder="name" 
          value={name} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        <Input 
          placeholder="email" 
          value={email} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <Input 
          placeholder="password" 
          type="password" 
          value={password} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>
          create user
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input 
          placeholder="email" 
          value={email} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <Input 
          placeholder="password" 
          type="password" 
          value={password} 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>

    
  )
}
