import mongoose, { Document, Model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


// interface IProduct extends Document {
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   status: string;
//   imageUrl: string;
// }

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      // required: true,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongoosePaginate);

const Product /* : Model<IProduct> */ =
  mongoose.models.Product ||
  mongoose.model(/* <IProduct> */ "Product", ProductSchema);

export default Product;
// export type { IProduct };
