const router = require("express").Router()
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Is Working",
    message: "Welcome to RESTapi!"
  })
})
var controller = require("../controller/controller")

// Contact routes
router.route("/users").get(controller.list_all_users)

// Export API routes
module.exports = router
