import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";

const server = express();
server.use(express.json());
dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

server.get("/api", (req, res) => {
  res.send("Hello From API");
});

server.use("/api/products", productRoutes);
server.use("/api/users", userRoutes);
server.use("/api/orders", orderRoutes);

server.use(notFound);
server.use(errorHandler);

server.listen(PORT, () =>
  console.log(
    `Server Started in ${NODE_ENV} on PORT ${PORT}`.cyan.underline.bold
  )
);
