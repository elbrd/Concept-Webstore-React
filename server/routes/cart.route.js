import { Router } from "express";
import { createCart, getCart } from "../services/cart.service.js";

const router = Router();

// GET cart
router.get("/", async (req, res, next) => {
  const userId = "12345";
  const result = await getCart(userId);

  if (result.success) {
    res.status(200).json({
      success: true,
      carts: result.carts,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

// POST add to cart
router.post("/", async (req, res, next) => {
  const userId = "1";
  const { productId, quantity } = req.body;

  let cart;

  const cartExist = await getCart(userId);
  if (cartExist.sucess) {
    cart = cartExist.cart;
  } else {
    const newCart = await createCart({
      userId: userId,
      items: [],
    });

    cart = newCart.cart;
  }

  cart.items.push({
    productId,
    quantity,
  });

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

export default router;
