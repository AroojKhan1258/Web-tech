const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/extreme-adventures")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

module.exports = mongoose;
