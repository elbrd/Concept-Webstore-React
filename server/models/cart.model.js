import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: String,
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  guest: Boolean,
});

const Cart = model("Cart", cartSchema);

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
