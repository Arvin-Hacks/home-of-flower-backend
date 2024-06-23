import Order from "../models/order.models.js";
import Cart from "../models/cart.models.js";
// import { sendAdminNotification } from "../services/sendSMS.js";
// import Order from '../models/order.models';
// sendAdminNotification
export const placeOrder = async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!user || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const totalAmount = items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const newOrder = new Order({
      user,
      items,
      totalAmount,
    });

    await newOrder.save();

    // Send notification to admin
    // sendAdminNotification(newOrder);
    if (newOrder) {
      const removeCart = await Cart.updateOne(
        { user },
        { $set: { items: [] } }
      );
    }

    return res
      .status(201)
      .json({ message: "Order Placed Successfully", data: newOrder });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
