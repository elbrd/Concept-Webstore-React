import { Router } from "express";
import { getUser, registerUser } from "../services/users.service.js";
import {
  comparePasswords,
  hashPassword,
} from "../scripts/utils/bcrypt.util.js";
import { signToken } from "../scripts/utils/jwt.util.js";

const router = Router();

// POST register user
router.post("/register", async (req, res, next) => {
  const newUser = req.body;

  if (!newUser) {
    return next({
      status: 400,
      message: "No request body provided",
    });
  }

  const existingUser = await getUser(newUser.username);

  if (existingUser.success) {
    return next({
      status: 400,
      message: "Username already exists",
    });
  }

  const result = await registerUser({
    username: newUser.username,
    password: await hashPassword(newUser.password),
    role: "User",
  });

  if (result.success) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.user,
    });
  } else {
    next({
      success: false,
      message: result.message,
    });
  }
});

// POST login user
router.post("/login", async (req, res, next) => {
  const user = req.body;

  if (!user) {
    return next({
      status: 400,
      message: "No request body provided",
    });
  }

  const result = await getUser(user.username);

  if (result.success) {
    if (await comparePasswords(user.password, result.user.password)) {
      const token = signToken({
        userId: result.user._id,
        username: result.user.username,
        role: result.user.role,
      });

      res.status(201).json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } else {
      return next({
        status: 401,
        message: "Invalid password",
      });
    }
  } else {
    return next({
      success: false,
      message: result.message,
    });
  }
});

export default router;
