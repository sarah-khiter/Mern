const Product = require("../Models/productModels.js");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !price || !stock || !category) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const product = new Product({
      owner: req.user.id, 
      name,
      description,
      price,
      stock,
      category,
    });

    await product.save();
    res.status(201).send({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProductsByUserId = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.params.userId });
    if (!products || products.length === 0) {
      return res.status(404).send({ error: "No products found for this user" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
};
