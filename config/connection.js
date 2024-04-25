const { connect, connection } = require("mongoose");

const connectionString = "mongodb://localhost:27017/thesocialnetworkdb";

connect(connectionString);

module.exports = connection;

// const mongoose = require("mongoose");

// mongoose.connect(
//  process.env.MONGODB_URI || "mongodb://localhost:27017/thesocialnetworkdb"
// );

// module.exports = mongoose.connection;
