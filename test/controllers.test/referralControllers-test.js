const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const Referral = require('../models/referralModels.js');
const User = require('../models/UserModels.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  // Clear database after each test
  await Referral.deleteMany();
  await User.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Referral Controller', () => {
  test('Create Referral', async () => {
    const referrer = await User.create({ 
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
 });
    const referredUser = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
 });

    const response = await request(app)
      .post('/referrals')
      .send({ referrerId: referrer._id, referredUserId: referredUser._id })
      .expect(201);

    const referral = await Referral.findById(response.body.referral._id);
    expect(referral).toBeTruthy();
    expect(referral.referrer).toEqual(referrer._id);
    expect(referral.referredUser).toEqual(referredUser._id);
  });

  test('Grant Referral Bonus', async () => {
    const referrer = await User.create({ 
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
       });
    const referredUser = await User.create({ 
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', });
    const referral = await Referral.create({ referrer: referrer._id, referredUser: referredUser._id });

    await request(app)
      .put(`/referrals/${referral._id}/grant-bonus`)
      .expect(200);

    const updatedReferral = await Referral.findById(referral._id);
    expect(updatedReferral.bonusGranted).toBe(true);
  });
});
