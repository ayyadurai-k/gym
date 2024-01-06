import mongoose from "mongoose";

const connectDatabse = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URI)
            .then(() => {
                console.log(`Database Connected Successfully...!`);
            })
            .catch((error) => {
                console.log(`Database Connection Fail : ${error.message} `);
            })
    }
    catch (error) {
        console.log(`Database Connection Fail : ${error.message}...! `);
    }
}

export default connectDatabse;