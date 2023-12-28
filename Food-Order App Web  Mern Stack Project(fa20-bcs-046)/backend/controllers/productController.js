const productController = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

// get all
// productController.get("/", verifyToken, async (req, res) => {
productController.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
});

productController.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(201).send("product not found");
    }
    product.title = req.body.title;
    product.desc = req.body.desc;
    product.price = req.body.price;
    product.review = req.body.review;
    product.category = req.body.category;

    const updatedProduct = await product.save();
    res
      .status(200)
      .json({ data: updatedProduct, message: "product updated successfuly" });
  } catch (e) {
    res.status(201).json({ error: e, message: "product not found" });
  }
});

productController.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ data: product, message: "product deleted successfuly" });
  } catch (e) {
    res.status(201).json({ error: e, message: "product not found" });
  }
});

// get one
// productController.get("/find/:id", verifyToken, async (req, res) => {
productController.get("/find/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({ msg: "No product with such id!" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
});

// create product
// productController.post('/', verifyTokenAdmin, async(req, res) => {
productController.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
  }
});

module.exports = productController;
