const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  markers: [{
    id: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    // Additional fields as needed
  }],
  // Additional fields as needed
}, { timestamps: true });

const Map = mongoose.model('Map', mapSchema);

module.exports = Map;
