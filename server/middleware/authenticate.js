var {User} = require('./../models/user.js');


// Middleware function syntax (req, res, next)=>{}
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  // Use a model method here to be defined in user.js
  User.findByToken(token).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    req.user  = user;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send(JSON.stringify(e, undefined, 2));
  })
};


module.exports = {authenticate};