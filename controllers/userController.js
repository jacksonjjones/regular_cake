const { User, Thought } = require("../models");

// Define user controller object
const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      // Find all users and exclude the __v field from the results
      const userData = await User.find().select("-__v");
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a single user by _id
  async getSingleUser(req, res) {
    try {
      // Find a user by _id, populate its friends and thoughts fields, and exclude the __v field
      const userData = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      // Check if user data exists
      !userData
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      // Create a new user with the provided request body
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a user by _id
  async updateUser(req, res) {
    try {
      // Find and update a user by _id, and return the updated user data
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      // Check if user data exists
      !userData
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Delete a user by _id
  async deleteUser(req, res) {
    try {
      // Find and delete a user by _id
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      // Check if user data exists
      if (!userData) {
        res.status(404).json({ message: "No user with that ID!" });
      }
      // Delete thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      // Send success message
      res.json({ message: "User and associated thoughts have been deleted!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Add a friend to a user's friends list
  async addFriend(req, res) {
    try {
      // Add a friend to a user's friends list
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      // Check if user data exists
      !userData
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Remove a friend from a user's friends list
  async removeFriend(req, res) {
    try {
      // Remove a friend from a user's friends list
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      // Check if user data exists
      !userData
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
