// var MongoClient = require('mongodb').MongoClient;
// ES6 Destructuring
var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if(err){
    return console.log('Unable to connect to the MongoDB Server');
  }

  console.log('Connected to MongoDB server');
  var collection      = db.collection('Todos');
  var usersCollection = db.collection('Users');

  // Lesson for Todos
    // findOneAndUpdate
    // collection.findOneAndUpdate({
    //   _id: new ObjectID("58689ded99ef9b0759449de5")
    // },
    // {
    //   $set:{
    //     completed: true
    //   }
    // },{
    //   returnOriginal: false
    // }).then(function(result){
    //   console.log(JSON.stringify(result, undefined, 2));
    // });

  // Challenge for Users

  usersCollection.findOneAndUpdate(
    {
      name:'Cristina Fidelino'
    },
    {
      $set:{
        name:'Adrianne Cristina Fidelino'
      },
      $inc:{
        age: 1
      }
    },
    {
      returnOriginal: false
    }
  ).then(function(result){
    console.log(JSON.stringify(result, undefined,2));
  })

  // db.close();


});