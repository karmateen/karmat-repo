const mongoose = require('mongoose');
const User = require('../models/UserModels.js');

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
    const user = await User.create(userData);

    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('name', userData.name);
    expect(user).toHaveProperty('email', userData.email);
  });

  // Add more tests for updateUser and deleteUser
});
