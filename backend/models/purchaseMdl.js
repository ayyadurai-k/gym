import { Schema, model, Types } from "mongoose";

const purchaseSchema = new Schema({
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
    buyer: {
        type: String,
        required: [true, "Trainer Is Required...!"]
    }
})


const Purchase = model('Purchase', purchaseSchema)
export default Purchase