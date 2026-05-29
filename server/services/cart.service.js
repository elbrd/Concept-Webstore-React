import Cart from "../models/cart.model.js";

// Get cart
export const getCart = async (userId) => {
  try {
    const result = await Cart.findOne({ userId });

    if (result) {
      return {
        success: true,
        cart: result,
      };
    } else throw new Error("Failed to fetch cart");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Populate cart
export const populateCart = async (userId) => {
  try {
    // Hämta cart
    // Läs alla productIds
    // Hämta motsvarande produkter från Product-collectionen
    // Stoppa in produkterna i resultatet
    const result = await Cart.findOne({ userId }).populate("items.productId");

    if (result) {
      return {
        success: true,
        cart: result,
      };
    } else throw new Error("Failed to fetch cart");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Create cart
export const createCart = async (newCart) => {
  try {
    const result = await Cart.create(newCart);

    if (result) {
      return {
        success: true,
        cart: result,
      };
    } else throw new Error("Failed to create cart");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
