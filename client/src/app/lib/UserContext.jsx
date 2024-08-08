"use client"
import axios from "axios"
import {createContext, useEffect, useState} from "react"
import getUser from "./fetchUser"
import Toast from "../component/Toast"

axios.defaults.withCredentials = true
export const UserContext = createContext()

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [toast, setToast] = useState({show: false, message: "", type: false})

  useEffect(() => {
    if (user === null) {
      getUser(setUser)
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser, toast, setToast}}>
      <div className="p-3">{children}</div>
      {toast?.show && <Toast message={toast?.message} type={toast?.type} />}
    </UserContext.Provider>
  )
}

export default UserContextProvider
