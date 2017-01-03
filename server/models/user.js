var _          = require('lodash');
var mongoose   = require('mongoose');
var validator  = require('validator');
var jwt        = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

// Override to JSON method to limit returning data
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
  var user     = this;
  var access   = 'auth';
  var token    = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access:access, token:token});

  return user.save().then(()=>{
    return token;
  });
};

var User       = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}