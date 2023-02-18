const User = require('../models/user');

class UserController {
  async addUser(email, password) {
    try {
      const user = new User({
        email,
        password,
      });

      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUserById(id, updates) {
    try {
      const user = await User.findByIdAndUpdate(id, updates, { new: true });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUserById(id) {
    try {
      const result = await User.findByIdAndDelete(id);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new UserController();
