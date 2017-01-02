var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var app = express();
var port = process.env.PORT || 3000;

// Local Imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

// MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
// Post Route
app.post('/todos', function(req, res){
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(JSON.stringify(e, undefined, 2));
  })
});

// GET /todos Route
app.get('/todos', function(req,res){
  Todo.find().then(function(todos){
    // Add an object instead of an array for flexibility
    res.send({todos:todos})
  }, function(e){
    res.status(400).send(e);
  });
});

// GET/todos/:id
app.get('/todos/:id', function(req,res){
  var id = req.params.id;

  // Validate the id
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo:todo});

  }).catch((e)=>{
    res.status(400).send();
  })
});

// DELETE ROUTES
app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(404).send({});
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(404).send({});
  });
});

app.listen(port, function(){
  console.log("Listening at port:" + port);
});

module.exports = {
  app: app
}