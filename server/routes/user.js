import express from "express"
import UserController from "../controllers/UserController.js"
import {body} from "express-validator"
import UserModel from "../models/User.js"
import multer from "multer"
import ensureDirectoryExist from "../lib/fileUtils.js"
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "api/uploads/")
  },
  filename: function (req, file, cb) {
    const newName = "upload" + Date.now() + "." + file.mimetype.split("/")[1]
    cb(null, newName)
  },
})
const middlewareUploadImage = multer({storage: storage}).array("photos", 100)
// place
router.post("/uploadImage", ensureDirectoryExist, middlewareUploadImage, UserController.uploadImage)
router.post("/upload-by-link", ensureDirectoryExist, UserController.uploadByLink)
router.post("/create-place", UserController.createPlace)
router.delete("/delete-image/:namePhoto", UserController.deleteImage)
router.patch("/place/:id", UserController.updatePlace)
router.get("/place/:id", UserController.getPlace)
router.get("/place", UserController.getPlaces)
// user
router.get("/profile", UserController.profile)
router.post(
  "/login",
  [
    body("email", "Please enter a valid email!").isEmail().trim(),
    body("password")
      .custom(async (value) => {
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value || value.length < 8 || value.length > 20)) {
          const err = new Error(
            "Password should be 8-20 characters and include at least 1 letter !",
          )
          throw err
        }
        return true
      })
      .trim(),
  ],
  UserController.login,
)
router.post(
  "/register",
  [
    body("name", "Maximum lenght of name is 20!").isLength({max: 20}).trim(),
    body("email", "Please enter a valid email !")
      .isEmail()
      .trim()
      .custom(async (value) => {
        const userExist = await UserModel.findOne({email: value})
        if (userExist) {
          throw new Error("E-mail already in use")
        }
        return true
      }),
    body("password")
      .custom(async (value) => {
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value || value.length < 8 || value.length > 20)) {
          const err = new Error(
            "Password should be 8-20 characters and include at least 1 letter !",
          )
          throw err
        }
        return true
      })
      .trim(),
  ],
  UserController.register,
)
export default router
