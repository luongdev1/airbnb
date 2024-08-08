"use client"
import FormInput from "@/app/component/FormInput"
import axios from "axios"
import Link from "next/link"
import React, {useState} from "react"

const page = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPw: "",
  })
  
  const onChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const respone = await axios.post(`${process.env.baseUrl}/user/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      const result = await respone
      if (result.data) {
        alert("register is successful!")
      }
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }

  const inputs = [
    {
      id: 1,
      name: "name",
      placeholder: "Please enter your name",
      type: "text",
      require: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
      messageErr: "more  than letters and not includes special character!",
    },
    {
      id: 2,
      name: "email",
      placeholder: "Please enter your email",
      type: "email",
      require: true,
      messageErr: "Email is invalid!",
    },
    {
      id: 3,
      name: "password",
      placeholder: "Please enter your password",
      type: "text",
      require: true,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      messageErr:
        "Password must have at least one lowercase letter and one uppercase letter and one special character!",
    },
    {
      id: 4,
      name: "confirmPw",
      placeholder: "Please enter your confirm password",
      type: "text",
      require: true,
      pattern: data.password,
      messageErr: "Password not match!",
    },
  ]

  return (
    <div>
      <form className="max-w-md mx-auto translate-y-1/2" onSubmit={handleLogin}>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={data[input.name]} onChange={onChange} />
        ))}
        <button className="primary w-full px-2 py-3">Register</button>
        <div className="flex gap-2 justify-center mt-1">
          <Link href={"/"}>Forgot password ?</Link>
          <Link href={"/login"} className="font-semibold underline">
            Login now!
          </Link>
        </div>
      </form>
    </div>
  )
}

export default page
