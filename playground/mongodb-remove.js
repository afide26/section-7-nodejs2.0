var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo}     = require('./../server/models/todo.js');
var {User}     = require('./../server/models/user.js');


// Remove the whole collection
  // Todo.remove({}).then((result)=>{
  //   console.log(JSON.stringify(result, undefined,2));
  // });

// Remove one record findByIdAndRemove or findOneAndRemove
  Todo.findOneAndRemove({_id:'586a2b276dd4b4ba17f809fc'}).then((todo)=>{
    console.log(todo);
  });