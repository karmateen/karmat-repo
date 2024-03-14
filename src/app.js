const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mapRoutes = require('./routes/mapRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes.js');
const propertyRoutes = require('./routes/propertyRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const { globalErrorHandler } = require('./utils/errorHandlers.js');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);
app.use('/users', userRoutes);
app.use('/map', mapRoutes);
app.use('/notifications', notificationRoutes);
app.use('/chat', chatRoutes);

app.use(globalErrorHandler);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
