const User = require('../models/UserModels.js');

exports.createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return user;
};

exports.deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};
