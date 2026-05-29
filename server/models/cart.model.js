import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

/*
items: [
  {
    productId: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
],
*/
