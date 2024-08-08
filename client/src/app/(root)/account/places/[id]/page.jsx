"use client"
import FormPlace from "@/app/component/FormPlace"
import {UserContext} from "@/app/lib/UserContext"
import axios from "axios"
import {useRouter} from "next/navigation"
import {useContext, useEffect, useState} from "react"

const page = ({params}) => {
  const {setToast} = useContext(UserContext)
  const [data, setData] = useState()
  const {id: idPlace} = params
  const router = useRouter()
  useEffect(() => {
    axios
      .get(`${process.env.baseUrl}/user/place/${idPlace}`)
      .then((res) => setData(res.data))
      .catch((err) => err)
  }, [])

  const handleOnSubmit = async (event, data, photos, ckPers, messageS, messageF) => {
    event.preventDefault()
    const dataPost = {...data, photos: [...photos], perks: [...ckPers]}
    try {
      await axios.patch(`${process.env.baseUrl}/user/place/${idPlace}`, dataPost)
      router.push("/account/places")
    } catch (error) {
      setToast({show: false, message: messageF, type: false})
    }
  }
  return (
    <>
      {data && (
        <FormPlace
          titleBtn="update"
          dataForm={data}
          messageS={"updated!"}
          messageF={"update failed!"}
          onSubmit={handleOnSubmit}
        />
      )}
    </>
  )
}

export default page
