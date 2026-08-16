// getting-started.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  location: String,
  description: String,
  image: String,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
