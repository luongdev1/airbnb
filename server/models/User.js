import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
     name: {
          type: String,
          require: true
     },
     email: {
          type: String,
          unique: true,
          require: true
     },
     password: {
          type: String,
          require: true
     },
})
const UserModel = mongoose.model('User', UserSchema)

export default UserModel