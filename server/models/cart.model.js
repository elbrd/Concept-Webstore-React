import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
