import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares
/*
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
*/
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

// Database
database.on("error", (error) => console.log(error));
database.once("connected", () => {
  console.log("DB Connected");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(errorHandler);
