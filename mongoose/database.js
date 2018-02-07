const _ = require('lodash')
const bcrypt = require('bcryptjs')

const mongoose = require('./mongoose-connect')
let articleSchema = require('./models/article')
let profileSchema = require('./models/profile')
let userSchema = require('./models/user')
let blogSchema = require('./models/blog')

let Article = mongoose.model('Article', articleSchema)
let Profile = mongoose.model('Profile', profileSchema)
let User = mongoose.model('User', userSchema)
let Blog = mongoose.model('Blog', blogSchema)

const TAGS = {
  computerscience: 'Computer Science',
  biotechnology: 'Biotechnology',
  entrepreneurship: 'Entrepreneurship',
  engineering: 'Engineering',
  media: 'Media'
}

//Article Functions
function getPreviews(issueNumber){
    const fields = 'title preview_src position blurb route_name'
    return Article.find({issueId:issueNumber, visible: true}, fields)
}

function getFiveMostRecentArticles(){
  return Article.find({visible: true},'title preview_src blurb route_name').sort({publish_date: -1}).limit(5)
}

function getLandingTaggedArticles() {
  const tags = Object.values(TAGS)
  const promiseArray = tags.map(tag => {
    return Article.find({tags: tag, visible: true}, 'title preview_src blurb route_name')
  })
  return Promise.all(promiseArray)
  .then(articleSets => {
    return articleSets.map((set,i) => {
      return {
        tag: tags[i],
        articles: _.shuffle(set).slice(0,2)
      }
    })
  })
}

function getTaggedArticles(tagname){
  return Article.find({tags: TAGS[tagname], visible: true}, 'title preview_src blurb route_name')
  .then(articles => {
    return {
      articles,
      tagname: TAGS[tagname]
    }
  })
  
}

function getAllArticles(){
  return Article.find()
}

function createNewArticle(){
  return new Article({
    title: 'New Article',
    content: ''
  }).save()
}

function getArticleById(id){
  return Article.findById(id).populate({
    path: 'authors',
    model: 'User',
    populate: {
      path: 'profile',
      model: 'Profile'
    }
  })
}

function getArticleByName(name, cb){
  return Article.findOne({route_name: name})
  .populate({
    path: 'authors',
    model: 'User'
  })
}

function saveArticle(article){
  return Article.findById(article._id)
  .then((art) => {
    art.title = article.title;
    art.content = article.content;
    art.authors = article.authors;
    art.blurb = article.blurb;
    art.issueId = article.issueId;
    art.route_name = article.route_name;
    return art.save()
  })
  .then((saved) => {
    return saved
  })
  .catch((error) => {
    console.log(error)
  })
}

function upsertArticle(article){
  
}

function allImageUrls(cb){
  Article.find({},'image_src preview_src').exec(cb)
}

//User Functions
function createUser(user){
  const newUser = new User({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    hashedPassword: bcrypt.hashSync(user.password, 8)
  })
  return newUser.save()
}

function findUserByFacebookId(fbid){
  return User.findOne({facebookId: fbid})
}

function authenticateUser(email,password){
  return User.findOne({email})
  .then(user => {
    if(!user) return null;
    if(user.validatePassword(password)){
      return user;
    } 
    return null;
  })
  .catch(err => {
    return err
  })
}

function getUserById(id, cb){
  return User.findById(id) 
}

function getAllUsers(){
  return User.find().sort({firstname: 1})
}

function upsertUser(id, cb){

}

//Blog Functions

function getAllBlogs(cb){
  Blog.find().exec(cb)
}

function getBlogById(id, cb){
  Blog.findById(id).exec(cb)
}

function getPostsByAuthorId(id, cb){
  Blog.find({author: id}).sort('publish_date').exec(cb)
}

function getPostsByTag(tagEnum, cb){
  Blog.find().exec(function(err,posts){
    var filtered = posts.filter(function(post){
      return post.tags.some(function(tag){
        if(tag === tagEnum){
          return true;
        }
      })
    })
    cb(err,filtered)
  })
}

module.exports = {
  getFiveMostRecentArticles,
  createNewArticle,
  saveArticle,
  getLandingTaggedArticles,
  getAllArticles,
  getArticleById,
  getArticleByName,
  upsertArticle,
  getPreviews,
  allImageUrls,
  createUser,
  getUserById,
  findUserByFacebookId,
  authenticateUser,
  getAllUsers,
  upsertUser,
  getTaggedArticles
}
