import React, {useContext, useEffect} from "react"
import {UserContext} from "../lib/UserContext"
import {FaCheck} from "react-icons/fa"
import {MdError} from "react-icons/md"

const Toast = ({message, type}) => {
  const {setToast} = useContext(UserContext)
  useEffect(() => {
    setTimeout(() => {
      setToast({show: false, message: ""})
    }, 3000)
  }, [])

  return (
    <div
      className={`${
        type ? "border-l-green-500 border-l-4 shadow-lg" : "border-l-red-500 border-l-4 shadow-lg"
      } overflow-hidden fixed top-2 right-2 max-w-max z-50 px-3 py-5 rounded-lg border bg-white flex items-center gap-3 animate-fadeIn`}>
      {type ? (
        <FaCheck className="text-green-500 text-2xl" />
      ) : (
        <MdError className="text-red-500 text-2xl" />
      )}
      <p className="text-lg first-letter:capitalize">{message}</p>
      <div className="absolute inset-x-0 h-1 bottom-0">
        <div
          className={`${
            type ? "bg-green-500" : "bg-red-500 "
          } h-full w-full animate-decreaseWidth`}></div>
      </div>
    </div>
  )
}

export default Toast
