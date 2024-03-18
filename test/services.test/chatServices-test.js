const mongoose = require('mongoose');
const Chat = require('../models/chatModels.js');
const chatService = require('../services/chatServices.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/test',);
});

afterEach(async () => {
  // Clear database after each test
  await Chat.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Chat Service', () => {
  test('Create Chat', async () => {
    const chatData = {
      participants: ['user1', 'user2'],
      messages: [
        { sender: 'user1', content: 'Hello!' },
        { sender: 'user2', content: 'Hi there!' }
      ]
    };

    const chat = await chatService.createChat(chatData);

    expect(chat).toHaveProperty('_id');
    expect(chat.participants).toEqual(expect.arrayContaining(chatData.participants));
    expect(chat.messages.length).toBe(chatData.messages.length);
    // Additional assertions based on the created chat
  });

  // Add more tests for chat service as needed
});
