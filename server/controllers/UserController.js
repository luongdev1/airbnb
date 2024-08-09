import UserModel from "../models/User.js"
import PlaceModel from "../models/Place.js"
import fs from "fs"
import bcrypt from "bcrypt"
import {validationResult} from "express-validator"
import jwt from "jsonwebtoken"
import imageDownloader from "image-downloader"
import path from "path"
import {uploadDir} from "../lib/fileUtils.js"

class User {
  // [post] /user/login
  async login(req, res, next) {
    const {email, password} = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      const userDoc = await UserModel.findOne({email})
      if (userDoc) {
        const comparePass = await bcrypt.compare(password, userDoc.password)
        if (comparePass) {
          jwt.sign(
            {email: userDoc.email, id: userDoc._id},
            process.env.JWT_SECRECT,
            (err, token) => {
              if (err) throw err
              res
                .cookie("token", token, {
                  secure: true,
                  expiresIn: new Date(Date.now() + 24 * 3600000 * 30).toString(),
                })
                .json({status: true, message: "login is successful!"})
            },
          )
        } else {
          res.status(422).json({status: false, message: "password isn't match!"})
        }
      } else {
        res.status(422).json({status: false, message: "user isn't exist!"})
      }
    } else {
      res.status(422).json({status: false, message: errors.array()[0].msg})
    }
  }
  // [post] /user/register
  async register(req, res) {
    const {name, email, password} = req.body
    const resultValidate = validationResult(req)
    if (!resultValidate.isEmpty()) {
      const msg = resultValidate.array()[0].msg
      res.status(422).json({status: false, message: msg})
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const userDoc = await UserModel.create({name, email, password: hashPassword})
      res.status(200).json(userDoc)
    }
  }
  // [get] /user/profile
  profile(req, res, next) {
    const {token} = req.cookies
    if (token) {
      jwt.verify(token, process.env.JWT_SECRECT, {}, async (err, user) => {
        if (err) throw err
        const {name, email, _id} = await UserModel.findById(user.id)
        res.status(200).json({name, email, _id})
      })
    } else {
      res.json(null)
    }
  }
  // [post] /user/upload-by-link
  uploadByLink(req, res, next) {
    const {link} = req.body
    const newName = "upload" + Date.now() + ".jpg"
    const filePath = path.join(uploadDir, newName)
    const options = {
      url: link,
      dest: filePath,
    }

    imageDownloader
      .image(options)
      .then(() => res.status(200).json(newName))
      .catch((err) => res.status(422).json({status: false, message: "link isn't invalid!"}))
  }
  // [post] /user/uploadImage
  uploadImage(req, res, next) {
    const files = req.files
    if (files) {
      const listImage = []
      for (const file of files) {
        listImage.push(file.filename)
      }
      res.status(200).json(listImage)
    } else {
      const errors = new Error("upload image fail!")
      throw errors
    }
  }
  // [delete] /user/delete-image/:namePhoto
  deleteImage(req, res, next) {
    const {namePhoto} = req.params
    const imagePath = path.join(uploadDir, namePhoto)
    if (!namePhoto) {
      return res.status(400).json({message: "Missing 'namePhoto' parameter"})
    }
    try {
      fs.unlinkSync(imagePath)
      res.status(200).json({message: "Image deleted successfully"})
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }
  // [post] /user/create-place
  createPlace(req, res, next) {
    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body
    const {token} = req.cookies
    if (token) {
      jwt.verify(token, process.env.JWT_SECRECT, async (err, userData) => {
        if (err) throw err
        const placeDoc = await PlaceModel.create({
          owner: userData.id,
          title,
          address,
          photos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        })
        res.json(placeDoc)
      })
    } else {
      res.json(null)
    }
  }
  // [patch] /user/place/:id
  updatePlace(req, res, next) {
    const {id} = req.params
    const {token} = req.cookies
    const {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body

    if (token) {
      jwt.verify(token, process.env.JWT_SECRECT, async (err, userData) => {
        if (err) throw err
        await PlaceModel.updateOne(
          {_id: id},
          {
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          },
        )
        res.status(200).json({})
      })
    } else {
      res.json(null)
    }
  }
  // [get] /user/place
  getPlaces(req, res) {
    const {token} = req.cookies
    if (token) {
      jwt.verify(token, process.env.JWT_SECRECT, async (err, userData) => {
        const idOwner = userData.id
        const placeDocs = await PlaceModel.find({owner: idOwner})
        res.status(200).json(placeDocs)
      })
    } else {
      res.status(422).json({message: "user isn't exist!"})
    }
  }
  // [get] /user/place/:id
  async getPlace(req, res) {
    const {id} = req.params
    try {
      const placeDoc = await PlaceModel.findById(id)
      res.status(200).json(placeDoc)
    } catch (error) {
      res.status(422).json({message: "Place isn't exist!"})
    }
  }
}

const UserController = new User()
export default UserController
