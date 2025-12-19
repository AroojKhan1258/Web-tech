const mongoose = require("mongoose"); // ✅ CORRECT

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
