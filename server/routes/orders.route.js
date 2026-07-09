import { Router } from "express";
import { deleteCart, populateCart } from "../services/cart.service.js";
import { createOrder, getOrders } from "../services/orders.service.js";
import mongoose from "mongoose";
import { authorizeUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authorizeUser);

// GET user orders
router.get("/", async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await getOrders(userId);

  if (result.success) {
    res.status(200).json({
      success: true,
      orders: result.orders,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

// POST create order
router.post("/", async (req, res, next) => {
  const userId = req.user?.userId ?? null;

  let shipping;
  if (req.body.shipping === 0) {
    shipping = 0;
  } else if (req.body.shipping === 50) {
    shipping = 50;
  } else {
    return next({
      success: false,
      message: "Invalid shipping option",
    });
  }

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

  // Beräkna subtotal & total
  const subtotal = Math.ceil(
    cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    ),
  );
  const total = subtotal + shipping;

  // Datum för order
  const orderDate = new Date();
  const orderDateFormatted = `${orderDate.toLocaleString("sv-SE")}`;

  // Skapa ny order
  const order = await createOrder({
    userId,
    orderDate: orderDateFormatted,
    items: orderItems,
    shipping,
    subtotal,
    total,
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
