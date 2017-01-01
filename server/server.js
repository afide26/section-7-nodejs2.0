var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text:{
    type: String

  },
  completed:{
    type: Boolean
  },
  completedAt:{
    type: Number
  }
});

// // Create a new todo
  // var newTodo = new Todo({text: 'Cook dinner'});


// // Save the todo in the database
  // newTodo.save().then(function(doc){
  //   console.log('Saved todo', doc);
  // }, function(err){
  //   console.log('Unable to save todo');
  // });

// Challenge
  var challenge = new Todo({text:'Complete course', completed: true, completedAt: new Date().getTime()});

  challenge.save().then((doc)=>{
    console.log('New todo has been saved', doc);
  }, (err)=>{
    console.log('Failed to save new todo', err);
  });





