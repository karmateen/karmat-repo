const request = require('supertest');
const app = require('../app'); 
mongoose = require('mongoose');
const Map = require('../models/mapModels.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  // Clear database after each test
  await Map.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Map Controller', () => {
  test('Get Map Data', async () => {
    // Create sample map data
    const mapData = [{ 
        markers: [
          {
            id: 'marker1',
            lat: 51.5074,
            lng: -0.1278,
            title: 'Lagos state',
            // Additional fields as needed
          },
          {
            id: 'marker2',
            lat: 40.7128,
            lng: -74.0060,
            title: 'Ondo state',
            // Additional fields as needed
          },
          // More marker objects
        ],
        // Additional fields as needed
       }];
    await Map.create(mapData);

    const response = await request(app)
      .get('/map')
      .expect(200);

    expect(response.body).toHaveLength(mapData.length);
    // Additional assertions based on the response structure
  });

  test('Update Map Marker', async () => {
    // Logic to create a map marker or mock data
    const markerId = 'markerId';
    const updatedMarkerData = {
        markers: [
          {
            id: 'marker1',
            lat: 51.5074,
            lng: -0.1278,
            title: 'Lagos state',
            // Additional fields as needed
          },
          {
            id: 'marker2',
            lat: 40.7128,
            lng: -74.0060,
            title: 'Ondo state',
            // Additional fields as needed
          },
          // More marker objects
        ],
       };

    await request(app)
      .put(`/map/marker/${markerId}`)
      .send(updatedMarkerData)
      .expect(200);

    const updatedMarker = await Map.findById(markerId);
    expect(updatedMarker).toBeTruthy();
    // Additional assertions based on the updated marker data
  });
});
