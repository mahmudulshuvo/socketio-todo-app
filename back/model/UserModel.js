var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  username: String,
  todos: Array
})

module.exports = mongoose.model('Users', UserSchema)
