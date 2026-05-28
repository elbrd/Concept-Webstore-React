import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  thumbnail: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
