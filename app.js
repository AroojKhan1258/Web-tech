// -------------------- IMPORTS --------------------
const express = require("express");
const path = require("path");
const db = require("./db");              // MongoDB connection
const Product = require("./models/Product"); // Product model

const app = express();
const PORT = 3000;

// -------------------- MIDDLEWARE --------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------- MAIN ROUTES --------------------

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Checkout Page
app.get("/checkout", (req, res) => {
  res.render("checkout");
});

// CRUD Page (agar tum use kar rahi ho)
app.get("/crud", (req, res) => {
  res.render("crud");
});

// -------------------- PRODUCTS PAGE --------------------
// Pagination + Filtering
app.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category || "";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 1000000;

    let filter = {
      price: { $gte: minPrice, $lte: maxPrice }
    };

    if (category) {
      filter.category = category;
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.render("products", {
      products,
      page,
      limit,
      total,
      category,
      minPrice,
      maxPrice
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// ================= ADMIN ROUTES =================

// ADMIN DASHBOARD (READ)
app.get("/admin", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin/dashboard", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Admin Dashboard Error");
  }
});

// ADD PRODUCT FORM
app.get("/admin/add", (req, res) => {
  res.render("admin/adminAdd");
});

// CREATE PRODUCT
app.post("/admin/add", async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.status(500).send("Product Create Error");
  }
});

// EDIT PRODUCT FORM
app.get("/admin/edit/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/adminEdit", { product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Edit Page Error");
  }
});

// UPDATE PRODUCT
app.post("/admin/edit/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.status(500).send("Update Error");
  }
});

// DELETE PRODUCT
app.get("/admin/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.status(500).send("Delete Error");
  }
});

// -------------------- 404 PAGE --------------------
app.use((req, res) => {
  res.status(404).send("<h1>404 | Page Not Found</h1>");
});

// -------------------- SERVER --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
