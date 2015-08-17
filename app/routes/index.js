var mongoose = require('mongoose');
var BlogSchema = require('../schemas/blog');
var Blog = mongoose.model('Blog', BlogSchema);
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index.html');
});

router.get('/:id', function(req, res) {
  res.render(req.params.id + '.html');
});

module.exports = router;
