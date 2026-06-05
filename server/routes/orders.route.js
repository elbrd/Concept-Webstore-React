import { Router } from "express";
import { deleteCart, populateCart } from "../services/cart.service.js";
import { createOrder } from "../services/orders.service.js";
import mongoose from "mongoose";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authorizeUser);

// POST create order
router.post("/", async (req, res, next) => {
  const userId = req.user?.userId ?? null;

  // Hämta rätt cart och populera med "hela" produkter
  const result = await populateCart(userId);
  if (!result.success) {
    return next({
      success: false,
      message: result.message,
    });
  }

  const cart = result.cart;

  // Mappa igenom alla produkter och skapa nya orderItems
  const orderItems = cart.items.map((item) => ({
    productId: item.productId._id,
    title: item.productId.title,
    price: item.productId.price,
    quantity: item.quantity,
  }));

  // Skapa ny order med hjälp av nyss skapade orderItems
  const order = await createOrder({
    userId,
    items: orderItems,
  });

  if (!order.success) {
    return next({
      success: false,
      message: order.message,
    });
  }

  const deleteResult = await deleteCart(userId);

  if (!deleteResult.success) {
    return next({
      success: false,
      message: deleteResult.message,
    });
  }

  res.status(201).json({
    success: true,
    ...order,
  });
});

export default router;
