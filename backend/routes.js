const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
} = require("./Controllers/userControllers.js");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
} = require("./Controllers/productControllers.js");
const authMiddleware = require("./Middleware/authMiddleware.js");

const router = express.Router();
// routes users
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id",authMiddleware, updateUser);
router.delete("/delete/:id",authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);
router.get("/user/:id", authMiddleware, getUserById);

//routes  product
router.post("/product", authMiddleware, createProduct); 
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("/update/:id", authMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);
router.get("/products/:userId", getProductsByUserId);

module.exports = router;
