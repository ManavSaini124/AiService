"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"; 

const {Button} = require("@/components/ui/button")
const {Input} = require("@/components/ui/input")

export const HomeView =()=>{
    const router = useRouter();
  const {data: session} = authClient.useSession();
  if(!session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Not logged in</p>
      </div>
    )
  }
  return(
    <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut({
            fetchOptions:{
                onSuccess:() => router.push("/auth/sign-in"),
            }
            })
            }>
            Sign out
        </Button>
      </div>
  );
}