"use client"
import Link from "next/link"
// icons
import {FaAirbnb} from "react-icons/fa"
import {CiSearch} from "react-icons/ci"
import {MdMenu} from "react-icons/md"
import {IoPersonCircleOutline} from "react-icons/io5"
import {useContext} from "react"
import {UserContext} from "../lib/UserContext"

const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <header className="flex justify-between items-center capitalize fixed inset-x-0 top-0 z-30 bg-white p-3 shadow-sm">
      <Link href="/" className="flex gap-2">
        <FaAirbnb className="w-6 h-6 text-primary" />
        <span className="font-bold text-xl">airbnb</span>
      </Link>
      <div className="flex gap-2 items-center justify-between border-[1px] border-gray-300 shadow-md p-2 rounded-3xl">
        <div className="px-2 font-medium cursor-pointer">anywhere</div>
        <div className="px-2 font-medium cursor-pointer border-l border-r border-gray-400">
          any week
        </div>
        <div className="px-2 font-medium cursor-pointer">add guest</div>
        <button className="bg-primary rounded-full p-1 hover:bg-red-500">
          <CiSearch className="w-5 h-5 text-white" />
        </button>
      </div>
      <Link
        href={user ? "/account/profile" : "/login"}
        className="flex gap-2 items-center justify-between px-3 py-2 rounded-3xl border border-gray-400">
        <div className="cursor-pointer">
          <MdMenu className="w-6 h-6" />
        </div>
        {user !== null ? (
          <div className="font-semibold">{user?.name}</div>
        ) : (
          <div className="cursor-pointer">
            <IoPersonCircleOutline className="w-6 h-6" />
          </div>
        )}
      </Link>
    </header>
  )
}

export default Header
