import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

//@desc FETCH ALL PRODUCTS
//@route GET /api/products
//@access Public Access no Token Needed
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc FETCH SINGLE PRODUCTS
//@route GET /api/product/id
//@access Public Access no Token Needed
const getProductsById = asyncHandler(async (req, res) => {
  // const product = products.find((p) => p._id === req.params.id);
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductsById };
