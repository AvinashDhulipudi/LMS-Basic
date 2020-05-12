const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ClassSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: Number
  },
  endTime: {
    type: Number
  }
});

module.exports = Class = mongoose.model('class', ClassSchema);