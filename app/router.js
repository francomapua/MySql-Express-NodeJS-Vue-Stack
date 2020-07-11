var userController = require('./modules/user/user.controller');

module.exports = app => {
  app.use('/api', function(req, res, next){
    var nonAuthApi = [
      '/api/users/login'
    ]
    
    if(nonAuthApi.includes(req.originalUrl)){
      return next()
    }
    else{
      var auth = req.headers.authorization
      userController.checkAuth(auth)
      .then(authenticated =>{
        if(authenticated)
          next()
        else
          return res.status(403).send({message : 'Unauthorized'})
      })
    }
  })
  require("./modules/tutorial/tutorial.routes")(app)
  require("./modules/user/user.routes")(app)
  
}