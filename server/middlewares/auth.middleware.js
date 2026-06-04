import mongoose from "mongoose";
import { signToken, verifyToken } from "../scripts/utils/jwt.util.js";

export const authorizeUser = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  // If no token in req = new guest
  // Generates new guest token, verifies it and adds it to req
  if (!token) {
    const guestToken = signToken({
      userId: new mongoose.Types.ObjectId(),
    });

    const verified = verifyToken(guestToken);

    if (!verified.success) {
      return next({
        status: 401,
        message: verified.message,
      });
    }

    req.guestUser = verified.user;
    req.guestUser.guestToken = guestToken;

    return next();
  }

  // If token in req = verify token and add to req
  const verified = verifyToken(token);

  if (!verified.success) {
    return next({
      status: 401,
      message: verified.message,
    });
  }

  req.user = verified.user;

  next();
};
