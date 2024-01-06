import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    branchId: {
        type: String,
        required: [true, 'BranchID  Is Must Required...!'],
    },
    title: {
        type: String,
        required: [true, "Title Is Required...!"]
    },
    price: {
        type: Number,
        required: [true, "Price Is Required...!"]
    },
    who: {
        type: String,
        required: [true, "Who Is Required...!"]
    },
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
})


const Expence = model('Expence', expenseSchema)
export default Expence;