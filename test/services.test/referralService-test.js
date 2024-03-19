const mongoose = require('mongoose');
const Referral = require('../models/referralModels.js');
const referralService = require('../services/referralServices.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/testdb',);
});

afterEach(async () => {
  // Clear database after each test
  await Referral.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Referral Service', () => {
  test('Create Referral', async () => {
    const referralData = {
      referrer: 'user1',
      referredUser: 'user2',
      bonusGranted: false
    };

    const referral = await referralService.createReferral(referralData);

    expect(referral).toHaveProperty('_id');
    expect(referral.referrer).toBe(referralData.referrer);
    expect(referral.referredUser).toBe(referralData.referredUser);
    expect(referral.bonusGranted).toBe(referralData.bonusGranted);
    // Additional assertions based on the created referral
  });

  // Add more tests for referral service as needed
});


