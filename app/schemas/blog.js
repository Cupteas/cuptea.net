var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  datetime: String,
  content: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

BlogSchema.pre('save', function(next) {
  // 数据校验
  // 保存操作

  next();
});

BlogSchema.statics = {
  fetch: function(callback) {
    return this
      .find({})
      .sort('meta.updateAt')
      exec(callback)
  },
  findById: function(id, callback) {
    return this.
      findOne({_id: id})
      exec(callback)
  }
}

module.exports = BlogSchema;
