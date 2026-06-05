import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: String,
  items: Array,
});

const Order = model("Order", orderSchema);

export default Order;
