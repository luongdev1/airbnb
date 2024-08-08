"use client"
import {useContext, useEffect} from "react"
import {UserContext} from "./lib/UserContext"
import getUser from "./lib/fetchUser"

export default function Home() {
  const {setUser} = useContext(UserContext)
  useEffect(() => {
    getUser(setUser)
  }, [])
  return <main className="p-2">home</main>
}
