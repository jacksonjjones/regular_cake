// Require Express Router module
const router = require("express").Router();

// Require userRoutes and thoughtRoutes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Use userRoutes for paths starting with /users
router.use("/users", userRoutes);

// Use thoughtRoutes for paths starting with /thoughts
router.use("/thoughts", thoughtRoutes);

// Export the router
module.exports = router;
