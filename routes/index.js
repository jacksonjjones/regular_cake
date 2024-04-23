// Require Express Router module
const router = require("express").Router();

// Require API routes
const apiRoutes = require("./api");

// Use apiRoutes for paths starting with /api
router.use("/api", apiRoutes);

// Default route handler for incorrect routes
router.use((req, res) => {
  return res.send("Wrong route!");
});

// Export the router
module.exports = router;
