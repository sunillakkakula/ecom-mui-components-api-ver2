import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

//@desc FETCH ALL PRODUCTS
//@route GET /api/products
//@access Public Access no Token Needed

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // throw new Error("Some Error");
    res.json(products);
  })
);

//@desc FETCH SINGLE PRODUCTS
//@route GET /api/product/id
//@access Public Access no Token Needed

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id === req.params.id);
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

export default router;
