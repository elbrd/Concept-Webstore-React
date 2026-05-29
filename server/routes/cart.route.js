import { Router } from "express";
import { createCart, getCart } from "../services/cart.service.js";
import { getProduct } from "../services/products.service.js";

const router = Router();

// GET cart
router.get("/", async (req, res, next) => {
  const userId = "12345";
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
  const userId = "1";
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
  const userId = "1";
  const { productId, quantity } = req.body;

  // Check för giltigt productId
  const product = await getProduct(productId);

  if (!product.success) {
    return next({
      success: false,
      message: product.message,
    });
  }

  // Check för om cart redan finns eller inte
  // Om finns: cart = befintlig cart
  // Annars: cart = ny cart
  let cart;

  const cartExist = await getCart(userId);
  if (cartExist.success) {
    cart = cartExist.cart;
  } else {
    const newCart = await createCart({
      userId: userId,
      items: [],
    });

    cart = newCart.cart;
  }

  // Check för om item redan finns i cart eller inte
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (existingItem) {
    existingItem.quantity += 1;
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
    message: "Item successfully added",
    item: {
      productId,
      quantity,
    },
  });
});

// DELETE remove from cart
router.delete("/items/:productId", async (req, res, next) => {
  const userId = "1";
  const { productId } = req.params;

  // Check för giltigt productId
  const product = await getProduct(productId);

  if (!product.success) {
    return next({
      success: false,
      message: product.message,
    });
  }

  const { cart } = await getCart(userId);

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
