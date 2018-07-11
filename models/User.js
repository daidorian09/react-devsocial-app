const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt :{
    type : String    
  },
  avatar: {
    type: String
  },
  isActive:{
    type : Boolean,
    default : false
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  modifiedAt : {
    type : Date,
    default : null
  }
});

module.exports = User = mongoose.model('users', UserSchema);
