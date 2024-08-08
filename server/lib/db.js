import mongoose from "mongoose"

mongoose.connect("mongodb+srv://luong7002351:QivoH10NSGmmQa57@cluster0.uds5ssg.mongodb.net/")

const db = mongoose.connection

db.on("error", () => {
  console.log("connect to mongodb is failure!")
})
db.on("open", () => {
  console.log("connect to mongodb is successful!")
})
export default db
