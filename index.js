const express = require('express');
const handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const env = require('dotenv');
const database = require('./mongoose/database');
const app = express();

env.config();

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('splash');
});

app.get('/read/:id', (req, res) => {
  res.render('article', { title: "TITLE!", body: "This is an article with body!", id: req.params.id });
});

app.get('*', (req, res) => {
  res.render('error');
});

app.listen(process.env.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.info("Peep port %s 🌎", process.env.PORT);
  }
});