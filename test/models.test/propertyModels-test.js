const mongoose = require('mongoose');
const Property = require('../models/propertyModels.js');

describe('Property Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new property', async () => {
    const propertyData = { address: '123 Main St', price: 100000, bedrooms: 3 };
    const property = await Property.create(propertyData);

    expect(property).toHaveProperty('_id');
    expect(property).toHaveProperty('address', propertyData.address);
    expect(property).toHaveProperty('price', propertyData.price);
    expect(property).toHaveProperty('bedrooms', propertyData.bedrooms);
  });

  // Add more tests for updateProperty and deleteProperty
});
