var mongoose = require('mongoose');
var BlogSchema = require('../schemas/blog');
var Blog = mongoose.model('Blog', BlogSchema);

exports.index = function(req, res) {
  res.render('index.html');
};

exports.list = function(req, res) {
  Blog.fetch(function(err, blogs) {
    res.json(blogs);
  });
};
