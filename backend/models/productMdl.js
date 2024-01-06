import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Is Must Required....!"]
    },
    branchId: {
        type: String,
        required: [true, 'BranchID  Is Must Required...!'],
    },
    productId: {
        type: Number,
        required: [true, "Product ID Is Must Required....!"],
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Price Is Must Required....!"]
    }
})

const Product = model('Product', productSchema)
export default Product;