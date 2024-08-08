"use client"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import {useEffect, useState} from "react"
import {IoMdAdd} from "react-icons/io"

const page = () => {
  const [listPlace, setListPlace] = useState([])
  useEffect(() => {
    axios
      .get(`${process.env.baseUrl}/user/place`)
      .then((res) => setListPlace(res.data))
      .catch((err) => err)
  }, [])
  return (
    <div className="mt-11">
      <div className="max-w-max mx-auto ">
        <Link className="flex items-center gap-1 primary px-4 py-2" href={"/account/places/new"}>
          <IoMdAdd className="text-white" />
          add new place
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-4 mt-6">
        {listPlace?.length > 0 &&
          listPlace?.map((place, index) => (
            <Link
              key={index}
              href={`/account/places/${place._id}`}
              className="flex justify-between items-center w-full h-40 gap-4 cursor-pointer border rounded-xl border-gray-200 overflow-hidden shadow-sm hover:shadow-slate-300">
              <div className="h-full w-1/6 bg-slate-600">
                <Image
                  width={300}
                  height={250}
                  alt="imgPlace"
                  src={process.env.baseUrl + "/uploads/" + place?.photos[0]}
                  className="h-full w-full object-cover bg-slate-400"
                />
              </div>
              <div className="w-3/4 bacham">
                <h2 className="font-semibold text-xl">{place?.title}</h2>
                <p className="text-gray-400 text-ellipsis overflow-hidden">{place?.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default page
