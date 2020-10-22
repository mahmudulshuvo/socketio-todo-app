var userModel = require("../model/UserModel")

exports.list_all_users = function(req, res) {
  userModel.find({}, function(err, users) {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(users)
  })
}
