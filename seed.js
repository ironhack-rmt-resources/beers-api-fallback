const mongoose = require('mongoose');
const Beer = require('./Beer.model');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beers-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleBeers = [
  {
    name: "Buzz",
    tagline: "A Real Bitter Experience.",
    description: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    image_url: "https://images.punkapi.com/v2/keg.png",
    first_brewed: "09/2007",
    brewers_tips: "The earthy and floral aromas from the hops can be overpowering. Drop the hop addition back to 1g/L to make it more session-able.",
    attenuation_level: 75,
    contributed_by: "Sam Mason <samjbmason>"
  },
  {
    name: "Trashy Blonde",
    tagline: "You Know You Shouldn't",
    description: "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives or trans fats. All wrapped up with the customary BrewDog bite and imaginative twist.",
    image_url: "https://images.punkapi.com/v2/2.png",
    first_brewed: "04/2008",
    brewers_tips: "Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted that will totally ruin your beer.",
    attenuation_level: 76,
    contributed_by: "Sam Mason <samjbmason>"
  },
  {
    name: "Berliner Weisse With Yuzu - B-Sides",
    tagline: "Japanese Citrus Berliner Weisse.",
    description: "Japanese citrus fruit intensifies the sour nature of this German classic.",
    image_url: "https://images.punkapi.com/v2/keg.png",
    first_brewed: "11/2015",
    brewers_tips: "Clean everything twice. All you want is the clean sourness of lactobacillus.",
    attenuation_level: 83,
    contributed_by: "Sam Mason <samjbmason>"
  },
  {
    name: "Punk IPA 2007 - 2010",
    tagline: "Post Modern Classic. Spiky. Tropical. Hoppy.",
    description: "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
    image_url: "https://images.punkapi.com/v2/4.png",
    first_brewed: "04/2007",
    brewers_tips: "While it may surprise you, this version of Punk IPA isn't dry hopped but still packs a punch! To make the best of the aroma hops make sure they are fully submerged and add them just before knock out for an intense hop hit.",
    attenuation_level: 78,
    contributed_by: "Sam Mason <samjbmason>"
  },
  {
    name: "Avery Brown Dredge",
    tagline: "Bloggers' Imperial Pilsner.",
    description: "An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.",
    image_url: "https://images.punkapi.com/v2/5.png",
    first_brewed: "02/2009",
    brewers_tips: "Make sure you have a big enough yeast starter to ferment through the OG and lager successfully.",
    attenuation_level: 67,
    contributed_by: "Sam Mason <samjbmason>"
  }
];

async function seedDatabase() {
  try {
    // Clear existing beers
    await Beer.deleteMany({});
    console.log('Cleared existing beers');

    // Insert sample beers
    await Beer.insertMany(sampleBeers);
    console.log('Sample beers inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();