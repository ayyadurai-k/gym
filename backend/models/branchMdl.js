import { model,Schema } from "mongoose";

const branchSchema = new Schema({
    branchName : {
        type : String,
        required : [true,'Name is Must Required...!']
    },
    branchId : {
        type : String,
        required : [true,'Username is Must Required...!'],
        unique: [true,"Username Already Exists...!"]
    },
    password : {
        type : String ,
        minLength : [6,"Password Should Contains 6 Character...!"],
        required : [true,'Password is Must Required...!'],
    },
    address : {
        type : String,
        required : [true,'Address is Must Required...!']
    },
})

const Branch = model('Branch',branchSchema)

export default Branch;