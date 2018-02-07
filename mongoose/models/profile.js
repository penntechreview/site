var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Model = mongoose.model

var profileSchema = new Schema({
    image_src: String, //cloudinary link
    description: String
  }
)

module.exports = profileSchema