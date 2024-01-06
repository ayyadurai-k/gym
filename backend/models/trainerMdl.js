import { Schema, model } from "mongoose";

const trainerSchema = new Schema({
    branchId: {
        type: String,
        required: [true, 'BranchID  Is Must Required...!'],
    },
    trainerId: {
        type: String,
        required: [true, 'TrainerId  Is Must Required...!'],
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
    DOJ: {
        type: Date,
        required: [true, 'DOJ Number  Is Must Required...!'],
    },
    dutyTime: {
        type: Number,
        required: [true, 'DutyTime  Is Must Required...!'],
    }
})

const Trainer = model('Trainer', trainerSchema)
export default Trainer;