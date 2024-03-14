const propertyService = require('../services/propertyServices.js');

describe('Property Service', () => {
  it('should create a new property', async () => {
    const propertyData = { address: '123 Main St', price: 100000, bedrooms: 3 };
    const property = await propertyService.createProperty(propertyData);

    expect(property).toHaveProperty('_id');
    expect(property).toHaveProperty('address', propertyData.address);
    expect(property).toHaveProperty('price', propertyData.price);
    expect(property).toHaveProperty('bedrooms', propertyData.bedrooms);
  });

  // Add more tests for updateProperty and deleteProperty
});
