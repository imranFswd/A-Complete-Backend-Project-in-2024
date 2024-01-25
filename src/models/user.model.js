


import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";



// user schema

const userSchema = new Schema(
    {
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        username: {
            type: String,
            required: [true, 'User name is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: [true, 'Full Name is required'],
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: [true, 'Avatar is required'],
        },
        coverImage: {
            type: String
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

// console.log("userSchema: ", userSchema);
// console.log("watchHistory: ", userSchema.watchHistory);
// console.log("username: ", userSchema.username);
// console.log("email: ", userSchema.email);
// console.log("fullName: ", userSchema.fullName);
// console.log("avatar: ", userSchema.avatar);
// console.log("coverImage: ", userSchema.coverImage);
// console.log("password: ", userSchema.password);
// console.log("refreshToken: ", userSchema.refreshToken);
// console.log("timestamps: ", userSchema.timestamps);



// MIDDEWARE

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()

    console.log("this.password: ", this.password);
    console.log("next(): ", next());
})

// console.log("userSchema.pre: ", userSchema.pre);



// MIDDEWARE

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// console.log("userSchema.methods.isPasswordCorrect", userSchema.methods.isPasswordCorrect);



// ACCESS TOKEN

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// console.log("userSchema.methods.generateAccessToken: ", userSchema.methods.generateAccessToken);



// REFRESH TOKEN

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// console.log("userSchema.methods.generateRefreshToken", userSchema.methods.generateRefreshToken);



// console.log("User: ", User);



export const User = mongoose.model("User", userSchema)


