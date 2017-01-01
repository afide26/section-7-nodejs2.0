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
  // deleteMany
    // collection.deleteMany({text:'Have dinner'}).then(
    //   function(result){
    //     console.log(JSON.stringify(result,undefined, 2));
    //   }
    //   );

  // deleteOne
    // collection.deleteOne({text:'Have dinner'}).then(
    //     function(result){
    //       console.log(JSON.stringify(result,undefined, 2));
    //     }
    //   );
  // findOneAndDelete
    // collection.findOneAndDelete({text:'Have dinner'}).then(
    //   function(result){
    //     console.log(result);
    //   }
    // );

  // Challenge for Users
  // deleteMany
    // usersCollection.deleteMany({name:'Alan Fidelino'}).then(
    //   function(result){
    //     console.log(JSON.stringify(result, undefined, 2));
    //   }
    // );

  // findOneAndDelete
    usersCollection.findOneAndDelete({age:19}).then(
      function(result){
        console.log(JSON.stringify(result, undefined,2));
      }
    );





  // db.close();


});