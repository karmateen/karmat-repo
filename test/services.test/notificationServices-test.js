const mongoose = require('mongoose');
const Notification = require('../models/notificationModels.js');
const notificationService = require('../services/notificationServices.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/test', );
});

afterEach(async () => {
  // Clear database after each test
  await Notification.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Notification Service', () => {
  test('Create Notification', async () => {
    const notificationData = {
      recipient: 'user1',
      message: 'You have a new message'
    };

    const notification = await notificationService.createNotification(notificationData);

    expect(notification).toHaveProperty('_id');
    expect(notification.recipient).toBe(notificationData.recipient);
    expect(notification.message).toBe(notificationData.message);
    // Additional assertions based on the created notification
  });

  // Add more tests for notification service as needed
});
