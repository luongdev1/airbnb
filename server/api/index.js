import express from "express"
import route from "../routes/index.js"
import db from "../lib/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import {fileURLToPath} from "url"
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000
dotenv.config()
// connect db
db
// cors
app.use(
  cors({
    credentials: true,
  }),
)
// req json
app.use(express.json())
// accept accept to image on /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// cookie-parser
app.use(cookieParser())
// router
route(app)
app.get("/", (req, res) => res.send("home"))
// run
app.listen(PORT, () => {
  console.log("server is running on port " + PORT)
})

export default app
