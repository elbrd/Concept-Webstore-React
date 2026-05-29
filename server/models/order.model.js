import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  items: Array,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
