const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Chat = require('../models/chatModels.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  // Clear database after each test
  await Chat.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Chat Controller', () => {
  test('Send Message', async () => {
    // Logic to create a message or mock data
    const messageData = {
        sender: 'user1', 
        recipient: 'user2', 
        content: 'Hello, how are you?',
       };

    const response = await request(app)
      .post('/chat/send')
      .send(messageData)
      .expect(200);

    const createdMessage = await Chat.findById(response.body.id);
    expect(createdMessage).toBeTruthy();
    // Additional assertions based on the created message
  });

  test('Get Chat History', async () => {
    // Create sample chat history
    const chatHistory = [{ 
        participants: ['user1', 'user2'], 
        messages: [
          {
            sender: 'user1',
            content: 'Hello!',
            // Additional more fields as needed
          },
          {
            sender: 'user2',
            content: 'Hi there!',
            // Additional more fields as needed
          },
          // More message objects
        ],
      }];
    await Chat.create(chatHistory);

    const response = await request(app)
      .get('/chat/history')
      .expect(200);

    expect(response.body).toHaveLength(chatHistory.length);
    // Additional assertions based on the response structure
  });
});
