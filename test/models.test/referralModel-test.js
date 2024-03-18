const mongoose = require ('mongoose');
const Referral = require('../models/referralModel.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  // Clear database after each test
  await Referral.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Referral Model', () => {
  test('Create Referral', async () => {
    const referralData = {
      referrer: 'user1',
      referredUser: 'user2',
      bonusGranted: false
    };

    const referral = await Referral.create(referralData);

    expect(referral).toHaveProperty('_id');
    expect(referral.referrer).toBe(referralData.referrer);
    expect(referral.referredUser).toBe(referralData.referredUser);
    expect(referral.bonusGranted).toBe(referralData.bonusGranted);
    // Additional assertions based on the created referral
  });
});
