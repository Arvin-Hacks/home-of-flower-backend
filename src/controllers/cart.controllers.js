// controllers/cartController.js
// const Cart = require('../models/Cart');
// const Product = require('../models/Product');

import mongoose from "mongoose";
import Cart from "../models/cart.models.js";
import Product from "../models/product.model.js";

// const Cart = require("../models/cart.models");
// const Product = require("../models/product.model");

export const addToCart = async (req, res) => {
  const { productId, quantity, userId } = req.body;
  //   const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId, userId } = req.body;
  //   const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex > -1) {
      cart.items.splice(productIndex, 1);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
};

// New function to get the cart items for the logged-in user
export const getCart = async (req, res) => {
    // const userId = req.user._id;
  const userId = req.query?.userId;

  //   console.log("req", req);

  console.log("userId", req?.body);
  //   let id = new mongoose.Types.ObjectId(userId);
  console.log(userId);

  //   const response=await Cart.find({user:req?.body?.userId}).populate("items.product")

  //   console.log('res',response)

  try {
    const cart = await Cart.find({ user: userId }).populate(
      "items.product"
    );

    console.log("cart", cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res
      .status(200)
      .json({ message: "SuccessFully Fetched Cart", data: cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};
