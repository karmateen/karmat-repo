const { validationResult } = require('express-validator');
const { validateUser, validateProperty } = require('../utils/validators.js');

describe('Validators', () => {
  it('should return an error if user data is invalid', async () => {
    const req = { body: { name: '', email: 'invalid-email', password: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await validateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
  });

  // Add more tests for validateProperty
});
