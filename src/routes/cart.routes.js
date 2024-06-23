// routes/cartRoutes.js
import express from "express";
const router = express.Router();
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controllers.js";
// const cartController = require("../controllers/cart.controllers");
// const authMiddleware = require('../middleware/authMiddleware');

router.post("/add",  addToCart);
router.post("/remove",  removeFromCart);
router.get("/",  getCart); // New route to get cart items

export default router;
