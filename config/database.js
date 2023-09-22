const mongoose = require("mongoose");
require("dotenv").config();

const mongoDb = process.env.mongoURL;

//Set up database connection
mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//Handle connection events
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo connection error"));
db.once("open", () => {
  console.log("Connected to the database");
});

module.exports = db;
