import Product from "../models/product.model.js";

// Get all products
export const getProducts = async () => {
  try {
    const result = await Product.find();

    if (result) {
      return {
        success: true,
        products: result,
      };
    } else throw new Error("Failed to fetch products");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get single product by id
export const getProduct = async (id) => {
  try {
    const result = await Product.findOne({ id });

    if (result) {
      return {
        success: true,
        products: result,
      };
    } else throw new Error("Failed to fetch product");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
