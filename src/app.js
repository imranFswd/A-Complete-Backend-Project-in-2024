


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"



const app = express()



// MIDDLEWARE (CORS)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



// MIDDLEWARE (JSON Limit)

app.use(express.json({limit: "16kb"}))



// MIDDLEWARE (URL)

app.use(express.urlencoded({extended: true, linit: "16kb"}))



// MIDDLEWARE (Static Assets)

app.use(express.static("public"))



// MIDDLEWARE (Cookie Parser)

app.use(cookieParser())



// routes import

import userRouter from "./routes/user.route.js"



// routes declaration

app.use("/api/v1/user", userRouter)



/*
    http://localhost:8000/api/v1/user/
    http://localhost:8000/api/v1/user/register
    http://localhost:8000/api/v1/user/?username=if&fullName=if&password=if12&email=12@if.com&coverImage&avatar
*/



export { app }

 
