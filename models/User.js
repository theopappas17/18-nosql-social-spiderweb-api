const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trimmed: true 
  },
  email:{
    type:String,
    validate:{
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email',
          isAsync: false
        }
    },
  thoughts: {
    id: mongoose.Types.ObjectId,
  },
  friends: {
    id: mongoose.Types.ObjectId,
  }
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;
