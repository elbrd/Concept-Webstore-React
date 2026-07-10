import Order from "../models/order.model.js";

// Get orders
export const getOrders = async (userId) => {
  try {
    const result = await Order.find({ userId });

    if (result) {
      return {
        success: true,
        orders: result,
      };
    } else throw new Error("Failed to fetch orders");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

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
