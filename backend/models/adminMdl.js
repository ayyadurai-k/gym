import { model,Schema } from "mongoose";

const adminSchema = new Schema({
    name : {
        type : String,
        required : [true,'Name is Must Required...!']
    },
    username : {
        type : String,
        required : [true,'Username is Must Required...!'],
        unique: [true,"Username Already Exists...!"]
    },
    password : {
        type : String ,
        minLength : [6,"Password Should Contains 6 Character...!"]
    }
})

const Admin = model('Admin',adminSchema)

export default Admin;