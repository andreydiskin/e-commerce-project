const Product = require("../models/Product");
const Category = require("../models/Category");
const { verifyTokenAndAdmin } = require("./verifyToken");
const { queryFormater } = require("../helpers/queryFormater");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS VIA QUERY
router.get("/query", async (req, res) => {
  const queryString = queryFormater(req.query);
  try {
    let products;
    products = await Product.find(queryString).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET NEW PRODUCTS
router.get("/showcaseproducts", async (req, res) => {
  try {
    let products;
    const newProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
    const electronicProducts = await Product.find({
      categories: "electronics",
    }).limit(3);
    const foodProducts = await Product.find({ categories: "food" }).limit(3);
    const toysProducts = await Product.find({ categories: "toys" }).limit(3);
    products = {
      New: newProducts,
      Electronic: electronicProducts,
      Food: foodProducts,
      Toys: toysProducts,
    };
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/featured", async (req, res) => {
  try {
    const categoriesN = await Category.find().limit(3);
    const featuredProducts = await Product.find({
      categories: {
        $in: [categoriesN],
      },
    }).limit(9);
    res.status(200).json(featuredProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
