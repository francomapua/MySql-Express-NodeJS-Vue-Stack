module.exports = app => {
  require("./modules/tutorial/tutorial.routes")(app)
  require("./modules/user/user.routes")(app)
}