const { Schema, model } = require("mongoose");

// Define the schema for the User model
const userSchema = new Schema(
  {
    // Username field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Email field
    email: {
      type: String,
      required: true,
      unique: true,
      // Validate email format using regex
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    // Array of thoughts associated with the user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Array of friends (user references)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Define schema options
    toJSON: {
      virtuals: true,
    },
    id: false, // Disable inclusion of default _id field
  }
);

// Define a virtual field to calculate the friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the schema
const User = model("User", userSchema);

// Export the User model
module.exports = User;
