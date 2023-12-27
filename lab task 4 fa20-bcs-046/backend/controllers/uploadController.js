const uploadController = require("express").Router();
const Product = require("../models/Product");

const multer = require("multer");
const { verifyToken } = require("../middlewares/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({
  storage,
  // same as storage: storage
});

// req.body.image
uploadController.post(
  "/image",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const file = req.file;
      console.log("file and id: ", file, id);
      const product = await Product.findById(id);
      product.img = file.filename;
      const updatedProduct = await product.save();
      return res.status(201).json({ msg: "Successfully uploaded file" });
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = uploadController;
