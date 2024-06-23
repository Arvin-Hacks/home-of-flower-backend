import mongoose from "mongoose";
import { customAlphabet } from 'nanoid';

// Create a custom alphabet to generate short unique IDs
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

const Schema = mongoose.Schema;
// interface IProduct {
//   _id: string;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   imageUrl: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   status: string;
// }

// interface IItem {
//   product: IProduct;
//   quantity: number;
// }

// interface IOrder extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   items: IItem[];
//   totalAmount: number;
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ItemSchema: Schema = new Schema({
//   product: {
//     type: Schema.Types.Mixed,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1,
//   },
// });

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => nanoid()
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.Mixed,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
      //   required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = nanoid();
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
