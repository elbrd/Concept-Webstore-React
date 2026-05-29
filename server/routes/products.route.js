import { Router } from "express";
import { getProduct, getProducts } from "../services/products.service.js";

const router = Router();

// GET all products
router.get("/", async (req, res, next) => {
  const result = await getProducts();

  if (result.success) {
    res.status(200).json({
      success: true,
      products: result.products,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

// GET single product by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const result = await getProduct(id);

  if (result.success) {
    res.status(200).json({
      success: true,
      product: result.products,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

export default router;
