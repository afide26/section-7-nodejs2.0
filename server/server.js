var express = require('express');
var bodyParser = require('body-parser');

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

// GET Route
app.get('/todos', function(req,res){
  Todo.find().then(function(todos){
    // Add an object instead of an array for flexibility
    res.send({todos:todos})
  }, function(e){
    res.status(400).send(e);
  });
});



app.listen(port, function(){
  console.log("Listening at port:" + port);
});

module.exports = {
  app: app
}