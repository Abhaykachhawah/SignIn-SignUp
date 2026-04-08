 
//   user Schema or structure of data to be stored in db .
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const UserSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   }
 })

 const UserModel = mongoose.model('users',UserSchema);
 module.exports = UserModel;