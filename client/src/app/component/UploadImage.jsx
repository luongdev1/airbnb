import {MdOutlineCloudUpload} from "react-icons/md"
import Image from "next/image"
import Loading from "@/app/component/Loading"
import {UserContext} from "@/app/lib/UserContext"
import axios from "axios"
import {memo, useContext, useState} from "react"
import {FaRegStar, FaRegTrashAlt, FaStar, FaTrashAlt} from "react-icons/fa"

const UploadImage = ({listImage, onChange}) => {
  const [loading, setLoading] = useState(false)
  const {setToast} = useContext(UserContext)
  const [linkImage, setLinkImage] = useState("")

  const onChangeLinkImg = (e) => {
    setLinkImage(e.target.value)
  }

  async function handleUploadByLink(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const {data: nameImage} = await axios.post(`${process.env.baseUrl}/user/upload-by-link`, {
        link: linkImage,
      })
      onChange((prev) => [...prev, nameImage])
      setLinkImage("")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const {data} = error.response
      setToast({type: false, message: data.message, show: true})
    }
  }

  async function uploadImage(ev) {
    const files = ev.target.files
    const data = new FormData()
    for (const file of files) {
      data.append("photos", file)
    }
    setLoading(true)
    const {data: photos} = await axios.post(`${process.env.baseUrl}/user/uploadImage`, data)
    onChange((prev) => [...prev, ...photos])
    setLoading(false)
  }

  async function removeImage(nameImage) {
    onChange(listImage.filter((photo) => photo != nameImage))
    try {
      await axios.delete(`${process.env.baseUrl}/user/delete-image/${nameImage}`)
    } catch (error) {
      console.log("delete image error!")
    }
  }

  function addMainImage(nameImage) {
    const photos = listImage.filter((photo) => photo != nameImage)
    if (photos.length > 0) {
      photos.unshift(nameImage)
      onChange(photos)
    }
  }

  return (
    <>
      <div>
        <h2 className="font-semibold text-xl">Photos</h2>
        <p className="text-gray-700">more = better</p>
        <div className="flex gap-2 items-center">
          <input
            onChange={onChangeLinkImg}
            type="text"
            placeholder="add using a link ... jpg"
            value={linkImage}
          />
          <button
            onClick={handleUploadByLink}
            disabled={linkImage === "" ? true : false}
            className={`px-2 min-w-max bg-gray-300 rounded-xl h-10 ${
              linkImage === "" ? "cursor-not-allowed" : ""
            }`}>
            Add photo
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {listImage?.length > 0 &&
          listImage?.map((nameImg, index) => (
            <div className="relative">
              <Image
                src={process.env.baseUrl + "/uploads/" + nameImg}
                width={500}
                height={500}
                alt="img"
                key={index}
                className="object-cover h-40 w-full border rounded-xl border-gray-300"
              />
              <div className="absolute flex justify-between bottom-1 inset-x-0 px-3">
                <div onClick={() => addMainImage(nameImg)}>
                  {nameImg === listImage[0] ? (
                    <FaStar className="text-white text-xl cursor-pointer" />
                  ) : (
                    <FaRegStar className="text-white text-xl cursor-pointer" />
                  )}
                </div>
                <div>
                  <FaRegTrashAlt
                    onClick={() => removeImage(nameImg)}
                    className="text-white text-xl cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        {loading && <Loading />}
        <label
          className={`${
            linkImage !== "" ? "cursor-not-allowed" : "cursor-pointer"
          } flex items-center justify-center h-40 gap-2 font-semibold border rounded-xl border-gray-300 px-10 py-16 `}>
          <input
            hidden
            type="file"
            multiple
            onChange={uploadImage}
            disabled={linkImage !== "" ? true : false}
          />
          <MdOutlineCloudUpload className="text-2xl" />
          Upload
        </label>
      </div>
    </>
  )
}

export default memo(UploadImage)
