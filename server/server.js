var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text:{
    type: String,
    required: true,
    minlength: 5,
    trim: true

  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  }
});


// // Challenge
//   var challenge = new Todo({text:'Finish this course'});

//   challenge.save().then((doc)=>{
//     console.log('New todo has been saved', doc);
//   }, (err)=>{
//     console.log('Failed to save new todo', err);
//   });


userOne = new User({
  email: 'alan@yahoo.com.au'
});

userOne.save().then(function(doc){
    console.log('New user created', doc);
  }, function(err){
    console.log('Unable to save user', JSON.stringify(err, undefined, 2));
  });



