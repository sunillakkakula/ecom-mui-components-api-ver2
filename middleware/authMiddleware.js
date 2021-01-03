import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Token Found : " + req.headers.authorization);
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("User Details  " + req.user);
    } catch (error) {
      console.error(error);
      res.status("401");
      throw new Error("Not Authorized ..!");
    }
  }
  if (!token) {
    console.log("Token Not Found ");
    res.status(401);
    throw new Error("Not Authorized - No Valid JWT Token ");
  }
  next();
});

export { protect };
