var mongoose = require('mongoose')
var Schema = mongoose.Schema

var articleSchema = new Schema({
  content: String,
  authors: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  editor: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  image_src: String,
  blurb: String,
  tags: [{
    type: String,
    enum: ['Biotechnology', 'Computer Science', 'Engineering', 'Media', 'Entrepreneurship']
  }],
  preview_src: String,
  publish_date: Date,
  route_name: String,
  visible: {
    type: Boolean,
    default: false
  }
})


module.exports = articleSchema