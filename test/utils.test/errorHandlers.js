const { catchAsync, globalErrorHandler } = require('../utils/errorHandlers.js');

describe('Error Handlers', () => {
  it('should catch async errors', async () => {
    const asyncFunction = async () => {
      throw new Error('Test error');
    };

    const wrappedFunction = catchAsync(asyncFunction);
    await expect(wrappedFunction()).rejects.toThrow('Test error');
  });

  // Add more tests for globalErrorHandler
});
