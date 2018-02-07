var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var Model = mongoose.model

var userSchema = new Schema({
    firstname: {
      type:String,
      required:true
    },
    lastname: {
      type:String,
      required:true
    },
    email: {
      type:String,
      required:true
    },
    hashedPassword: {
      type: String,
      required:true
    },
    image_src: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
  toJSON:{
    virtuals: true
  },
  toObject:{
    virtuals: true
  }
})

userSchema.virtual('fullname').get(function(){
  return this.firstname + ' ' + this.lastname
})

userSchema.methods.validatePassword = function validatePassword(password) {
  const hashed = this.hashedPassword;
  return bcrypt.compareSync(password, hashed);
}

module.exports = userSchema