import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

//@desc cretae new  ORDER
//@route post /api/orders
//@access private Access no Token Needed
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      // user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      taxPrice,
    });
  }
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

export { addOrderItems };
