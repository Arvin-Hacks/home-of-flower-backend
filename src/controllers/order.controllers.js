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

// New function to get the cart items for the logged-in user
export const getOrders = async (req, res) => {
  // const userId = req.user._id;
  const userId = req.query?.userId;

  //   console.log("req", req);

  console.log("userId", req?.body);
  //   let id = new mongoose.Types.ObjectId(userId);
  console.log(userId);

  try {
    const orders = await Order.find({ user: userId }).populate("items.product");

    console.log("orders", orders);

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    return res
      .status(200)
      .json({ message: "SuccessFully Fetched orders", data: orders });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Order", error });
  }
};

// New function to get the cart items for the logged-in user
export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req?.params;
    console.log("ID", id);
    if (!id) {
      
      return res
        .status(400)
        .json({ message: "Inavalid order Details Request!" });
    }

    const response = await Order.findById(id).populate("items.product");
    if (!response) {
      return res.status(404).json({ message: "Orders not found" });
    }

    return res.status(200).json({ message: "Success", data: response });
  } catch (error) {
    console.log("get Error", error);
    return res.status(500).json({ message: "Order Details get error", error });
  }  
};
