const { Thought, User } = require("../models");

// Define thought controller object
const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      // Find all thoughts and exclude the __v field from the results
      const thoughtData = await Thought.find().select("-__v");
      res.json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a single thought by _id
  async getSingleThought(req, res) {
    try {
      // Find a thought by _id and exclude the __v field
      const thoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      // Check if thought data exists
      !thoughtData
        ? res.status(404).json({ message: "No thought with that Id" })
        : res.json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      // Create a new thought with the provided request body
      const thoughtData = await Thought.create(req.body);
      // Find the associated user and update their thoughts array with the new thought's _id
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      res.json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a thought by _id
  async updateThought(req, res) {
    try {
      // Find and update a thought by _id, and return the updated thought data
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      // Check if thought data exists
      !thoughtData
        ? res
            .status(404)
            .json({ message: "No thought associated with that ID!" })
        : res.json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Delete a thought by _id
  async deleteThought(req, res) {
    try {
      // Find and delete a thought by _id
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      // Check if thought data exists
      !thoughtData
        ? res
            .status(404)
            .json({ message: "No thought associated with that ID!" })
        : res.json({ message: "The thought has been deleted!" });
    } catch (error) {
      res.json(500).json(error);
    }
  },

  // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      // Find the thought by _id and add a new reaction to its reactions array
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      // Check if thought data exists
      !thoughtData
        ? res.status(404).json({ message: "No thought found with that ID!" })
        : res.json(thoughtData);
    } catch (error) {
      res.json(500).json(error);
    }
  },

  // Delete a reaction from a thought by reactionId
  async deleteReaction(req, res) {
    try {
      // Find the thought by _id and remove the reaction with the specified reactionId from its reactions array
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      // Check if thought data exists
      !thoughtData
        ? res.status(404).json({ message: "No thought found with that ID!" })
        : res.json(thoughtData);
    } catch (error) {
      res.json(500).json(error);
    }
  },
};

// Export the thought controller object
module.exports = thoughtController;
