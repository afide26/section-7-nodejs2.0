// Lecture 93 Test Database Seed
// Refactor the seed data

var{Todo}     = require('./../../models/todo.js');
var{User}     = require('./../../models/user.js');
var{ObjectID} = require('mongodb');
var jwt       = require('jsonwebtoken');



// Set up 2 users
var userOneId = new ObjectID();
var userTwoId = new ObjectID();
// Set an array of users
var users = [
  {
    _id: userOneId,
    email:'alan@example.com',
    password:'userOnePass',
    tokens:[{
      access:'auth',
      token: jwt.sign({_id: userOneId.toHexString(), access:'auth'}, 'abc123').toString()
    }]
  },
  {
    _id: userTwoId,
    email:'tin@example.com',
    password:'userTwoPass',
    tokens:[{
      access:'auth',
      token: jwt.sign({_id: userTwoId.toHexString(), access:'auth'}, 'abc123').toString()
    }]
  }
];



var todos = [{
  _id: new ObjectID(),
  text: "First Test todo",
  _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text:"Second Test todo",
    _creator: userTwoId,
    completed:true,
    completedAt: 1483359001030
}];

var populateTodos = (done)=>{
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
  }).then(()=>{
    done();
  });
};

var populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    // Use Promise.all([]) to fulfill the 2 promises above
    return Promise.all([userOne, userTwo]);
  }).then(()=> done());
}

module.exports = { todos, populateTodos, users, populateUsers}