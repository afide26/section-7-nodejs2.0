var {SHA256} = require('crypto-js');
var jwt      = require('jsonwebtoken');
var bcrypt   = require('bcryptjs');


// Lecture 92 playground
// ========================
var password = "123abc!"

// Comment the code below after running the salted password
  // bcrypt.genSalt(10, (err, salt)=>{
  //   bcrypt.hash(password, salt, (err, hash)=>{
  //     if(!err){
  //       return console.log(hash);
  //     }
  //     console.log(JSON.stringify(err, undefined, 2));
  //   })
  // });
var hashedPassword = '$2a$10$HqVmzLphQS618hoka4JD5e0MgCIuFt44wFUCm05X3WufENOvp9nz.';
bcrypt.compare(password, hashedPassword, (err, res)=>{
  if(!err){
    return console.log(res);
  }
});

// Lecture 90 playground
// ========================
// var data = {
//   id: 10
// }

// var token = jwt.sign(data, '123abc'); //jwt.sign() hashes the data and adds a secret, also returns a token
// console.log(token);


// var decoded = jwt.verify(token, '123abc');
// console.log('decoded:',decoded);
// var message  = 'I am user number 1';
// var hash     = SHA256(message).toString()  //Use the toString() as the return value is an object

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 3
// };

// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //'\'somesecret\'' is the salt of the hash'
// };

// // SIMULATED HASH CHANGE
//   // token.data.id = 5;
//   // token.data.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

// if(resultHash === token.hash){
//   console.log('The data has not changed');
// }else{
//   console.log('The data has changed. Do not trust!');
// }