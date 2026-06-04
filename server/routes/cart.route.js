import { Router } from "express";
import { createCart, getCart } from "../services/cart.service.js";
import { getProduct } from "../services/products.service.js";
import { authorizeUser } from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";

const router = Router();

router.use(authorizeUser);

// GET cart
router.get("/", async (req, res, next) => {
  const userId = req.user?.userId || req.guestUser?.userId;
  const result = await getCart(userId);

  if (result.success) {
    res.status(200).json({
      success: true,
      cart: result.cart,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

// DELETE clear cart
router.delete("/", async (req, res, next) => {
  const userId = req.user.userId;
  const result = await getCart(userId);

  if (result.success) {
    result.cart.items = [];
    await result.cart.save();
    res.status(200).json({
      success: true,
      message: "Cart successfully cleared",
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

// POST add to cart
router.post("/items", async (req, res, next) => {
  const { productId, quantity } = req.body;

  const userId = req.user?.userId ?? null;

  let guestId;
  let guestToken;
  if (!userId) {
    guestId = req.guestUser?.userId ?? null;
    guestToken = req.guestUser?.guestToken ?? null;
  }

  if (!userId && !guestId) {
    return next({
      success: false,
      message: "Unable to resolve userId or guestId",
    });
  }

  // Check för giltigt productId
  const product = await getProduct(productId);
  if (!product.success) {
    return next({
      success: false,
      message: product.message,
    });
  }

  // Check för om cart redan finns eller inte
  let cart;

  const cartExist = await getCart(userId ? userId : guestId);
  if (cartExist.success) {
    cart = cartExist.cart;
  } else {
    const newCart = await createCart({
      userId: userId ? userId : guestId,
      items: [],
      guest: userId ? false : true,
    });

    cart = newCart.cart;
  }

  // Check för om item redan finns i cart eller inte
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
    });
  }

  // Sparar gjorda ändringar i databas
  await cart.save();

  res.status(201).json({
    success: true,
    message: "Item/s successfully added",
    guestToken,
  });
});

// DELETE remove from cart
router.delete("/items/:productId", async (req, res, next) => {
  const { productId } = req.params;

  const userId = req.user?.userId ?? null;

  let guestId;
  if (!userId) {
    guestId = req.guestUser?.userId ?? null;
  }

  if (!userId && !guestId) {
    return next({
      success: false,
      message: "Unable to resolve userId or guestId",
    });
  }

  // Check för giltigt productId
  const product = await getProduct(productId);

  if (!product.success) {
    return next({
      success: false,
      message: product.message,
    });
  }

  // Check för om cart finns eller inte
  let cart;

  const cartExist = await getCart(userId ? userId : guestId);
  if (cartExist.success) {
    cart = cartExist.cart;
  } else {
    return next({
      success: false,
      message: cartExist.message,
    });
  }

  // Check för om item redan finns i cart eller inte
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      const filteredItems = cart.items.filter(
        (item) => item.productId.toString() !== productId,
      );
      cart.items = filteredItems;
    }
  } else {
    return next({
      success: false,
      message: "Item not found",
    });
  }

  // Sparar gjorda ändringar i databas
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item successfully removed",
  });
});

export default router;
