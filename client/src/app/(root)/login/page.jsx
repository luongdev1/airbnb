"use client"
import {UserContext} from "@/app/lib/UserContext"
import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React, {useContext, useState} from "react"

const page = () => {
  const [data, setData] = useState({
    email: "luong7002351@gmail.com",
    password: "123456A@a",
  })
  const isEmptydata = Object.values(data).some((data) => data === "")
  const router = useRouter()

  const onChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const respone = await axios.post(
        `${process.env.baseUrl}/user/login`,
        {
          email: data.email,
          password: data.password,
        },
        {withCredentials: true},
      )
      if (respone.data) {
        router.push("/account/places")
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login is failure!")
    }
  }

  return (
    <div className="flex items-center justify-center fixed inset-0">
      <div>
        <form className="max-w-md" onSubmit={handleLogin} noValidate>
          <input
            name="email"
            type="email"
            placeholder="Your email"
            onChange={onChange}
            value={data.email}
          />
          <input
            name="password"
            type="password"
            placeholder="Your password"
            onChange={onChange}
            value={data.password}
          />
          <button disabled={isEmptydata} className="primary w-full px-2 py-3" type="submit">
            Login
          </button>
        </form>
        <div className="flex gap-2 justify-center mt-1">
          <Link href={"/"}>Forgot password ?</Link>
          <Link href={"/register"} className="font-semibold underline">
            {" "}
            Register now!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
