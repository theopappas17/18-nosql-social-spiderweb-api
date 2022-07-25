const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { 
    type: String, 
    required: true, 
   maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    },
  username: {
    type: String,
    required: true,
  },
  reactions: {
    id: mongoose.Types.ObjectId,
  }
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

module.exports = Thought;
