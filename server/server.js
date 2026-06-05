import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import authRouter from "./routes/auth.route.js";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import ordersRouter from "./routes/orders.route.js";

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

// Database
database.on("error", (error) => console.log(error));
database.once("connected", () => {
  console.log("DB Connected");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(errorHandler);
