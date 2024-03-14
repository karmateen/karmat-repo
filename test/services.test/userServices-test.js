const userService = require('../services/userServices.js');

describe('User Service', () => {
  it('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
    const user = await userService.createUser(userData);

    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('name', userData.name);
    expect(user).toHaveProperty('email', userData.email);
  });

  // Add more tests for updateUser and deleteUser
});
