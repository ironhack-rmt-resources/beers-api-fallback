# Beers API - Backend for Iron Brewers

This is the backend API for the Iron Brewers React application. It provides endpoints to manage beer data including creating, reading, and searching beers.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Make sure MongoDB is running on your local machine
   - Or update the `MONGODB_URI` in `.env` file with your MongoDB connection string

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

4. Seed the database with sample data:
```bash
node seed.js
```

5. Start the server:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:3000/beers`

| Method | Endpoint            | Response (200)                                         | Action                                                       |
| ------ | ------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`  | `/`                 | [beers]                                                | Get all the beers from the DB                                |
| `GET`  | `/:id`              | { beer }                                               | Get a single/specific beer                                   |
| `GET`  | `/random`           | { beer }                                               | Get a random beer from the DB                                |
| `POST` | `/new`              | { message: "New beer successfully saved to database!"} | Create a new beer                                            |
| `GET`  | `/search?q={query}` | [beers]                                                | Search beers by name containing the specified term          |

## Request Body for POST /beers/new

When creating a new beer, send a JSON object with the following fields:

```json
{
  "name": "Beer Name",
  "tagline": "Beer Tagline",
  "description": "Beer Description",
  "image_url": "https://example.com/image.png",
  "first_brewed": "MM/YYYY",
  "brewers_tips": "Tips for brewing",
  "attenuation_level": 75,
  "contributed_by": "Your Name <email>"
}
```

**Important**: All fields are required, and `attenuation_level` must be a number.

## Example Usage

### Get all beers
```bash
curl http://localhost:3000/beers
```

### Get a specific beer
```bash
curl http://localhost:3000/beers/BEER_ID
```

### Get a random beer
```bash
curl http://localhost:3000/beers/random
```

### Search beers
```bash
curl http://localhost:3000/beers/search?q=IPA
```

### Create a new beer
```bash
curl -X POST http://localhost:3000/beers/new \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Custom Beer",
    "tagline": "A delicious brew",
    "description": "This is my custom beer description",
    "image_url": "https://example.com/beer.png",
    "first_brewed": "01/2024",
    "brewers_tips": "Keep it cold!",
    "attenuation_level": 80,
    "contributed_by": "John Doe <john@example.com>"
  }'
```