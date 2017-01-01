var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// Local Imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./db/models/todo.js');
var {User} = require('./db/models/user.js');

// MIDDLEWARE
app.use(bodyParser.json());

// ROUTES
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



app.listen(port, function(){
  console.log("Listening at port:" + port);
});