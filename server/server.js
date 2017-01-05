require('./config/config.js');
var express        = require('express');
var _              = require('lodash');
var bodyParser     = require('body-parser');
var {ObjectID}     = require('mongodb');

var app            = express();
var port           = process.env.PORT;

// Local Imports
var {mongoose}     = require('./db/mongoose');
var {Todo}         = require('./models/todo.js');
var {User}         = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');

// MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
// Post Route
app.post('/todos', authenticate, function(req, res){
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(JSON.stringify(e, undefined, 2));
  })
});

// GET /todos Route
app.get('/todos', authenticate, function(req,res){
  Todo.find({
    _creator: req.user._id
  }).then(function(todos){
    // Add an object instead of an array for flexibility
    res.send({todos:todos})
  }, function(e){
    res.status(400).send(e);
  });
});

// GET/todos/:id
app.get('/todos/:id', authenticate, function(req,res){
  var id = req.params.id;

  // Validate the id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator:req.user._id
  })
  .then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo:todo});

  }).catch((e)=>{
    res.status(400).send();
  })
});

// DELETE ROUTES
app.delete('/todos/:id', authenticate, (req, res)=>{
  var id = req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(404).send({});
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
  .then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(404).send({});
  });
});


// UPDATE ROUTES
app.patch('/todos/:id', authenticate, (req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  // Validate the id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  // Set up the conditions for the completed property
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed   = false;
    body.completedAt = null;
  }

  // Use mongoose modifier variables here
  // Body is an object that's why it's used in $set
  // new:true is like returnOriginal:false in mongodb-update.js
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo: todo});
  }).catch((e)=>{
    res.status(404).send();
  });
});

// USER ROUTES
app.post('/users', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.status(200).header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.get('/users', (req, res)=>{
  User.find().then((users)=>{
    res.status(200).send({users:users});
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
});
// USER Login route
app.post('/users/login', (req,res)=>{
  var body = _.pick(req.body, ['email','password']);

  // Use the new model method
  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.status(200).header('x-auth', token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send(e);
  })
});

// Lecture 97 Log Out Users
app.delete('/users/me/token', authenticate, (req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  })
});

app.listen(port, function(){
  console.log("Listening at port:" + port);
});

module.exports = {
  app: app
}







