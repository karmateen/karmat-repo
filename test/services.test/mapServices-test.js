const mongoose = require('mongoose');
const Map = require('../models/mapModels.js');
const mapService = require('../services/mapServices.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/testdb', );
});

afterEach(async () => {
  // Clear database after each test
  await Map.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Map Service', () => {
  test('Create Map', async () => {
    const mapData = {
      markers: [
        { id: 'marker1', lat: 51.5074, lng: -0.1278, title: 'London' },
        { id: 'marker2', lat: 40.7128, lng: -74.0060, title: 'New York' }
      ]
    };

    const map = await mapService.createMap(mapData);

    expect(map).toHaveProperty('_id');
    expect(map.markers.length).toBe(mapData.markers.length);
    // Additional assertions based on the created map
  });

  // Add more tests for map service as needed
});
