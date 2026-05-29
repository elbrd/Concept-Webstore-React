import Order from "../models/order.model.js";

// Create order
export const createOrder = async (order) => {
  try {
    const result = await Order.create(order);

    if (result) {
      return {
        success: true,
        order: result,
      };
    } else throw new Error("Failed to create order");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
