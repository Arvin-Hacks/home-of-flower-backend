import mongoose,{ Schema, model, Document,Model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';


// export interface ProductRequest extends Document {
//     productName: string
//     images: string[]
//     requestedBy: string | Schema.Types.ObjectId
//     isviewed: boolean,
//     notes: string,
//     messagebyAdmin?:string,
//     fullfilledDate: Date
// }


const RequestedMessageSchema/* : Schema<ProductRequest> */ = new Schema({
    message: {
        type: String,
    },  
    requestId:{
        type: Schema.Types.ObjectId,
        ref: "requestedproducts",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    type: {
        type: String
    },
    isviewed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

RequestedMessageSchema.plugin(mongoosePaginate);


// const Product /* : Model<IProduct> */ =
//   mongoose.models.Product ||
//   mongoose.model(/* <IProduct> */ "Product", ProductSchema);
const Messages = mongoose.models.messages /* <ProductRequest> */ || model("messages", RequestedMessageSchema)

export default Messages