


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
        const connetionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        
        console.log(`----------------------------------------------------------------\n MongoDB connected Successfully !!! \n----------------------------------------------------------------\n DB HOST: ${connetionInstance.connection.host} `);
        
        // console.log("connectionInstance: ", connetionInstance);
    } catch (error) {
        console.log(`---------------------------------------------------------------- \n MongoDB connection Failed !!!\n---------------------------------------------------------------- \n ${error}`);
        process.exit(1)
    }
}

// console.log("connectDB: ", connectDB);



export default connectDB


