"use client"
import FormPlace from "@/app/component/FormPlace"
import {UserContext} from "@/app/lib/UserContext"
import axios from "axios"
import {useRouter} from "next/navigation"
import {useContext} from "react"

const page = () => {
  const {setToast} = useContext(UserContext)
  const router = useRouter()

  const handleCreatePlace = async (event, data, photos, ckPers, messageS, messageF) => {
    event.preventDefault()
    const dataPost = {...data, photos: [...photos], perks: [...ckPers]}
    try {
      await axios.post(`${process.env.baseUrl}/user/create-place`, dataPost)
      router.push("/account/places")
    } catch (error) {
      setToast({show: false, message: messageF, type: false})
    }
  }
  return (
    <>
      <FormPlace
        titleBtn="save"
        dataForm={null}
        messageS={"created!"}
        messageF={"create failed!"}
        onSubmit={handleCreatePlace}
      />
    </>
  )
}

export default page
