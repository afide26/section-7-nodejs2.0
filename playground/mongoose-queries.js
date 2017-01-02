var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo}     = require('./../server/models/todo.js');
var {User}     = require('./../server/models/user.js');

// Lesson
  // var id = '5869c66476abb0921216724311';
  // // Validating IDs
  // if(!ObjectID.isValid(id)){
  //   console.log('ID not valid');
  // }
  // Todo.find({
  //     _id: id
  //   }).then((todos)=>{
  //     console.log('Todos', todos);
  //   }).catch((e)=>{
  //     console.log('The id is not in the array', JSON.stringify(e, undefined, 2));
  // });

  // Todo.findOne({
  //   _id: id
  // }).then((todo)=>{
  //   console.log('Todo', todo);
  // }).catch((e)=>{
  //   console.log('ID not found in Todos array', JSON.stringify(e, undefined, 2));
  // });

  // Todo.findById(id).then((todo)=>{
  //   console.log('Todo By Id', todo);
  // }).catch((e)=>{
  //   console.log('ID not found', JSON.stringify(e, undefined, 2));
  // });

var id = '5869cba370864f2b2c6f6cf9';

if(!ObjectID.isValid(id)){
  console.log('ID is not valid');
}else{
  User.findById(id).then((user)=>{
    console.log('User found with email address:', user.email);
  });
}




