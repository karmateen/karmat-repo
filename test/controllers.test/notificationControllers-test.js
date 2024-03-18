const request = require('supertest');
const app = require('../app.js'); 
const mongoose = require('mongoose');
const Notification = require('../models/notificationModel.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  // Clear database after each test
  await Notification.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Notification Controller', () => {
  test('Send Notification', async () => {
    // Logic to create a notification or mock data
    const notificationData = { 
        recipient: 'user1',
        message: 'You have a new message',
       };

    const response = await request(app)
      .post('/notifications/send')
      .send(notificationData)
      .expect(200);

    const createdNotification = await Notification.findById(response.body.id);
    expect(createdNotification).toBeTruthy();
    // Additional assertions based on the created notification
  });

  test('Get Notification History', async () => {
    // Create sample notification history
    const notificationHistory = [{ 
        recipient: 'user1', 
        message: 'Your history',
       }];
    await Notification.create(notificationHistory);

    const response = await request(app)
      .get('/notifications/history')
      .expect(200);

    expect(response.body).toHaveLength(notificationHistory.length);
    // Additional assertions based on the response structure
  });
});
