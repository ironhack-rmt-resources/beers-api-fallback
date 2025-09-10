const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  first_brewed: {
    type: String,
    required: true
  },
  brewers_tips: {
    type: String,
    required: true
  },
  attenuation_level: {
    type: Number,
    required: true
  },
  contributed_by: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;