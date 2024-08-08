"use client"
import UploadImage from "@/app/component/UploadImage"
import {useState} from "react"
import {FaCarSide, FaPlane, FaWifi} from "react-icons/fa"
import {MdPets, MdRadio} from "react-icons/md"

const FormPlace = ({titleBtn, dataForm, messageS, messageF, onSubmit}) => {
  const {photos: photosPlace, perks, ...rest} = dataForm ?? {}
  const [data, setData] = useState(rest)
  const [photos, setPhotos] = useState(photosPlace ? [...photosPlace] : [])
  const [ckPers, setCkPers] = useState(perks ? [...perks] : [])

  //   inital data
  const listPerks = [
    {
      name: "wifi",
      icon: <FaWifi />,
    },
    {
      name: "parking parking spot",
      icon: <FaCarSide />,
    },
    {
      name: "radio",
      icon: <MdRadio />,
    },
    {
      name: "pet",
      icon: <MdPets />,
    },
    {
      name: "plane",
      icon: <FaPlane />,
    },
    {
      name: "hh",
      icon: <FaWifi />,
    },
  ]

  const handleCbPerk = (e) => {
    const name = e.target.name
    const checked = e.target.checked
    if (checked) {
      setCkPers([...ckPers, name])
    } else {
      const newArr = ckPers.filter((perk) => perk !== name)
      setCkPers([...newArr])
    }
  }
  const onChangeInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <form encType="multipart/form-data">
      <div>
        <h2 className="font-semibold text-xl">Title</h2>
        <p className="text-gray-700">
          Title for your places, should be short and catchy as in advertisement
        </p>
        <input
          name="title"
          value={data.title}
          onChange={onChangeInput}
          type="text"
          placeholder="title, example: My lovely pp"
        />
      </div>
      <div>
        <h2 className="font-semibold text-xl">Address</h2>
        <p className="text-gray-700">Address to this place</p>
        <input
          name="address"
          onChange={onChangeInput}
          value={data.address}
          type="text"
          placeholder="address"
        />
      </div>
      <UploadImage listImage={photos} onChange={setPhotos} />
      <div>
        <h2 className="font-semibold text-xl">Description</h2>
        <p className="text-gray-700">description of the place</p>
        <textarea
          name="description"
          onChange={onChangeInput}
          value={data.description}
          className="w-full border-[1px] border-gray-300 rounded-xl min-h-24 p-1"
        />
      </div>
      <div>
        <h2 className="font-semibold text-xl">Perks</h2>
        <p className="text-gray-700">Select all the perks of the places</p>
        <div className="grid gap-2 grid-cols-3">
          {listPerks?.map((perk, index) => (
            <label
              htmlFor={perk.for}
              key={index}
              className="flex items-center justify-start gap-2 py-5 px-3 border-[1px] border-gray-300 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={ckPers.includes(perk.name)}
                name={perk.name}
                id={perk.name}
                onChange={handleCbPerk}
              />
              {perk.icon}
              <span className="first-letter:capitalize">{perk.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl">Extra infor</h2>
        <p className="text-gray-700">house roles, etc</p>
        <textarea
          name="extraInfo"
          onChange={onChangeInput}
          value={data.extraInfo}
          className="w-full border-[1px] border-gray-300 rounded-xl min-h-36 p-1"
        />
      </div>
      <div>
        <h2 className="font-semibold text-xl">Check in&out times</h2>
        <p className="text-gray-700">
          add check in and out times, remember to have some time window for cleaning the room
          between guests
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="w-full">
            <h5 className="font-semibold text-xl">Check in time</h5>
            <input name="checkIn" onChange={onChangeInput} value={data.checkIn} type="text" />
          </div>
          <div className="w-full">
            <h5 className="font-semibold text-xl">Check out time</h5>
            <input name="checkOut" onChange={onChangeInput} value={data.checkOut} type="text" />
          </div>
          <div className="w-full">
            <h5 className="font-semibold text-xl">Max number of guests</h5>
            <input name="maxGuests" onChange={onChangeInput} value={data.maxGuests} type="number" />
          </div>
        </div>
        <button
          type="submit"
          onClick={(event) => onSubmit(event, data, photos, ckPers, messageS, messageF)}
          className="primary w-full py-2 mt-2">
          {titleBtn}
        </button>
      </div>
    </form>
  )
}

export default FormPlace
