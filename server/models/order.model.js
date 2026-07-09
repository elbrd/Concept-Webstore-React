import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: String,
  orderDate: String,
  items: Array,
  shipping: Number,
  subtotal: Number,
  total: Number,
});

const Order = model("Order", orderSchema);

export default Order;
