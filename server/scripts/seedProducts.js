import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);

    const response = await fetch("https://dummyjson.com/products");

    const data = await response.json();

    const formattedProducts = data.products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      thumbnail: product.thumbnail,
    }));

    console.log(formattedProducts);

    await Product.deleteMany();

    await Product.insertMany(formattedProducts);

    console.log("Products inserted!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();
