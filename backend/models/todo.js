const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  description: {type: String, required: true}
  
});

module.exports = mongoose.model('Todo', todoSchema);