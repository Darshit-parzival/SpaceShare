const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// DB CONNECT
const dbConnection = () => {
  mongoose
    .connect(
      process.env.MDB_CONNECT,
      { dbName: process.env.MDB },
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
};

module.exports = dbConnection;
