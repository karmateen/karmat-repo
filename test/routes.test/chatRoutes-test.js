const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const Chat = require('../models/chatModels.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/testdb', );
});

afterEach(async () => {
  // Clear database after each test
  await Chat.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Chat Routes', () => {
  test('POST /chat', async () => {
    const res = await request(app)
      .post('/chat')
      .send({
        participants: ['user1', 'user2'],
        messages: [
          { sender: 'user1', content: 'Hello!' },
          { sender: 'user2', content: 'Hi there!' }
        ]
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.participants).toEqual(expect.arrayContaining(['user1', 'user2']));
    expect(res.body.messages.length).toBe(2);
  });

  // Add more tests for chat routes as needed
});
