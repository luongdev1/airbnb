import axios from "axios"
const getUser = (setUser) => {
  axios
    .get(`${process.env.baseUrl}/user/profile`)
    .then((res) => {
      setUser(res.data)
    })
    .catch((err) => err)
}
export default getUser
