import { Schema, model } from "mongoose";

const salesSchema = new Schema({
    branchId: {
        type: String,
        required: [true, 'BranchID  Is Must Required...!'],
    },
    products: [
        {
            name: {
                type: String,
                required: [true, "Product Name Is Required...!"]
            },
            productId: {
                type: Number,
                required: [true, "ProductId Is Required...!"]
            },
            quantity: {
                type: Number,
                required: [true, "Quantity Is Required...!"]
            },
            price: {
                type: Number,
                required: [true, "Price Is Required...!"]
            }
        }
    ],
    year: {
        type: Number,
        required: [true, "Date Is Required...!"]
    },
    month: {
        type: Number,
        required: [true, "Date Is Required...!"]
    },
    date: {
        type: Number,
        required: [true, "Date Is Required...!"]
    },
    seller: {
        type: String,
        required: [true, "Who Is Required...!"]
    }
})


const Sales = model('Sales', salesSchema)
export default Sales