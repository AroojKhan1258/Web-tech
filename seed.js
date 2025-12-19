const mongoose = require("mongoose");
const Product = require("./models/Product");
const db = require("./db");

const products = [
  {
    name: "Skydiving Experience",
    price: 12000,
    category: "Adventure",
    image: "/images/skydiving.png",
    description: "Feel the wind rush as you freefall from 10,000 feet!"
  },
  {
    name: "Mountain Climb",
    price: 8000,
    category: "Adventure",
    image: "/images/mountain.png",
    description: "Reach new heights with our expert guides."
  },
  {
    name: "Surfing Lesson",
    price: 6000,
    category: "Water Sports",
    image: "/images/surfing.png",
    description: "Ride the waves and conquer the ocean."
  }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Sample products inserted");
  mongoose.connection.close();
};

seedDB();
