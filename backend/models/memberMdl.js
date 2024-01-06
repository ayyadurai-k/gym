import { Schema, model } from "mongoose";

const memberSchema = new Schema({
    branchId: {
        type: String,
        required: [true, 'BranchID  Is Must Required...!'],
    },
    memberId: {
        type: String,
        required: [true, 'MemberId  Is Must Required...!'],
    },
    name: {
        type: String,
        required: [true, 'Name  Is Must Required...!'],
    },
    DOB: {
        type: String,
        required: [true, 'DOB  Is Must Required...!'],
    },
    gender: {
        type: String,
        required: [true, 'Gender  Is Must Required...!'],
        enum: {
            values: ["MALE", "FEMALE"],
            message: "Enter Correct Value...!"
        }
    },
    phone: {
        type: Number,
        required: [true, 'Phone Number  Is Must Required...!'],
    },
    requirement: {
        type: String,
        enum: {
            values: ["monthly", "half-yearly", "yearly"],
            message: "Please Enter Valid Requirements...!"
        },
        required: [true, 'Requirement  Is Must Required...!'],
    },
    year: {
        type: String,
        required: [true, "DOJ is Must Required...!"]
    },
    month: {
        type: String,
        required: [true, "DOJ is Must Required...!"]
    },
    date: {
        type: String,
        required: [true, "DOJ is Must Required...!"]
    },
    DOJ: {
        type: Date,
        required: [true, "DOJ is Must Required...!"]
    },
    DOE: {
        type: Date,
        required: [true, "DOJ is Must Required...!"]
    }
})

const Member = model('Member', memberSchema)
export default Member;