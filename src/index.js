
// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";



/*
** env variable config
*/

dotenv.config({
    path: './.env'
})



/*
**  database connection
*/

connectDB()
.then(() => {

    app.on("error", (err) => {
        console.log("ERROR: ", err);
        throw err
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`---------------------------------------------------------------- \n Server is running at port: ${process.env.PORT} \n----------------------------------------------------------------`);
    })


})
.catch((err) => {

    console.log(`---------------------------------------------------------------- \n MongoDB (Database) connection failed !!! \n ----------------------------------------------------------------`, err);


})




/*

import express from "express";

const app = express()

(async () => {

    try {
        await mongoose(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error);
        throw error
    }

    
})()

*/


