import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";





const connectDB = async () => {
    try {
        const connetionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log(`\n MongoDB connected Successfully !!! \n\n DB HOST: ${connetionInstance.connection.host} \n`);

        // console.log(connetionInstance);
    } catch (error) {
        console.log("MongoDB connection FAILED ", error);
        process.exit(1)
    }
}










export default connectDB

