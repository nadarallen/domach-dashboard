const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ["Admin", "Designer", "Manager"] },
});

module.exports = mongoose.model("User", userSchema);
