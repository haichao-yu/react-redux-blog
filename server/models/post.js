const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const postSchema = new Schema({
  title: String,
  categories: [String],
  content: String,  // html
  authorId: String,
  authorName: String,
  time: Date,
});

// Create the model class
const ModelClass = mongoose.model('post', postSchema);

// Export the model
module.exports = ModelClass;