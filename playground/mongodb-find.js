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

  // db.collection('Todos').find(
  //   {_id:new ObjectID('5868aad270864f2b2c6f5a10')
  //   }).toArray().then(function(docs){
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //   }, function(err){
  //     console.log('Unable to fetch todos', err);
  //   }
  // );

  // db.close();

  // Use another find method count()

  // db.collection('Todos').find().count().then(function(count){
  //   console.log(`Todos count: ${count}`);
  // }, function(err){
  //   console.log(err);
  // });

  // Challenge Find by count
    // usersCollection.find({ name:'Alan Fidelino', age: 25}).count().then(function(count){
    //   console.log(`Users count: ${count}`);
    // }, function(err){
    //   console.log(err);
    // });

  // Challenge find records
  usersCollection.find({name:'Alan Fidelino', age: 25}).toArray().then(function(docs){
    console.log('List of Users');
    console.log(JSON.stringify(docs, undefined,2));
  }, function(err){
    console.log(err);
  });


});