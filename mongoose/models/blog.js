var Schema = require('mongoose').Schema

var blogSchema = new Schema({
    content: String,
    author: {
      type: Schema.ObjectId,
      ref: 'Blog'
    },
    title: String,
    blurb: String,
    tags: [{
      type: String,
      enum: ['JavaScript', 'Penn Tech', 'Startups', 'Philly Tech'],
    }],
    preview_src: String,
    publish_date: Date,
  })


module.exports = blogSchema