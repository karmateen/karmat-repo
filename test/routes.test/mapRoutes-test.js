const request = require('supertest');
const app = require('../app.js'); 
const mongoose = require('mongoose');
const Map = require('../models/mapModel.js'); 

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.01:27017/testdb',);
});

afterEach(async () => {
  // Clear database after each test
  await Map.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Map Routes', () => {
  test('POST /map', async () => {
    const res = await request(app)
      .post('/map')
      .send({
        markers: [
          { id: 'marker1', lat: 51.5074, lng: -0.1278, title: 'Lagos state' },
          { id: 'marker2', lat: 40.7128, lng: -74.0060, title: 'Ondo state' }
        ]
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.markers.length).toBe(2);
  });

  // Add more tests for map routes as needed
});
