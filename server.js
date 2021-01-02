// const express = require("express");
// const dotenv = require("dotenv");

import express from "express";
import dotenv from "dotenv";
const server = express();

// const products = require("./data/products.js");
// import products from "./data/products.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

server.get("/api", (req, res) => {
  res.send("Hello From API");
});

server.use("/api/products", productRoutes);
server.use(notFound);

// server.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// });

/**server.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});*/
server.use(errorHandler);

server.listen(PORT, () =>
  console.log(
    `Server Started in ${NODE_ENV} on PORT ${PORT}`.cyan.underline.bold
  )
);
