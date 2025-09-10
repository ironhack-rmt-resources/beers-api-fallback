const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Beer = require('./Beer.model');

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beers-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes

// GET /beers - Get all beers
app.get('/beers', async (req, res) => {
  try {
    const beers = await Beer.find();
    res.json(beers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /beers/:id - Get a single beer
app.get('/beers/:id', async (req, res) => {
  try {
    const beer = await Beer.findById(req.params.id);
    if (!beer) {
      return res.status(404).json({ error: 'Beer not found' });
    }
    res.json(beer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /beers/random - Get a random beer
app.get('/beers/random', async (req, res) => {
  try {
    const count = await Beer.countDocuments();
    if (count === 0) {
      return res.status(404).json({ error: 'No beers found' });
    }
    const random = Math.floor(Math.random() * count);
    const beer = await Beer.findOne().skip(random);
    res.json(beer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /beers/new - Create a new beer
app.post('/beers/new', async (req, res) => {
  try {
    const {
      name,
      tagline,
      description,
      image_url,
      first_brewed,
      brewers_tips,
      attenuation_level,
      contributed_by
    } = req.body;

    // Validate required fields
    if (!name || !tagline || !description || !image_url || !first_brewed || !brewers_tips || !contributed_by) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure attenuation_level is a number
    const attenuationLevelNum = Number(attenuation_level);
    if (isNaN(attenuationLevelNum)) {
      return res.status(400).json({ error: 'attenuation_level must be a number' });
    }

    const newBeer = new Beer({
      name,
      tagline,
      description,
      image_url,
      first_brewed,
      brewers_tips,
      attenuation_level: attenuationLevelNum,
      contributed_by
    });

    await newBeer.save();
    res.status(200).json({ message: "New beer successfully saved to database!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /beers/search?q={query} - Search beers by name
app.get('/beers/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const beers = await Beer.find({
      name: { $regex: q, $options: 'i' } // Case-insensitive search
    });

    res.json(beers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
