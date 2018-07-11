const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  token : {
      type : String,
      default : null
  },
  isActive:{
    type : Boolean,
    default : true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  modifiedAt : {
    type : Date,
    default : null
  },
  expiredAt:{
    type : Date,
    default : null
  }
});

module.exports = Profile = mongoose.model('userToken', ProfileSchema);
