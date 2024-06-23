import mongoose, { Schema, model, Document, Model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// export interface ProductRequest extends Document {
//     productName: string
//     images: string[]
//     requestedBy: string | Schema.Types.ObjectId
//     isviewed: boolean,
//     notes: string,
//     messagebyAdmin?:string,
//     fullfilledDate: Date
// }

const RequestedProductSchema /* : Schema<ProductRequest> */ = new Schema(
  {
    title: {
      type: String,
    },
    images: [{ type: String }],
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    description: {
      type: String,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "messages",
      },
    ],
    isviewed: {
      type: Boolean,
      default: false,
    },
    fullfilledDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

RequestedProductSchema.plugin(mongoosePaginate);

// const Product /* : Model<IProduct> */ =
//   mongoose.models.Product ||
//   mongoose.model(/* <IProduct> */ "Product", ProductSchema);
const RequestedProduct =
  mongoose.models.requestedproducts /* <ProductRequest> */ ||
  model("requestedproducts", RequestedProductSchema);

export default RequestedProduct;
