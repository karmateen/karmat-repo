const authService = require('../services/authServices.js');

describe('Auth Service', () => {
  it('should return a token when logging in with valid credentials', async () => {
    const token = await authService.login('test@example.com', 'password');
    expect(token).toBeTruthy();
  });

  // Add more tests for register
});
