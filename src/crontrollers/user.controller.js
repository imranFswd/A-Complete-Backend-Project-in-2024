


import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const registerUser = asyncHandler( async (req, res) => {
    


    // step 01 - get user details from frontend
    // step 02 - validation - not empty
    // step 03 - check if user already exists: username, email
    // step 04 - check for images, check for avatar
    // step 05 - upload them to cloudinary, avatar
    // step 06 - create user object - create entry in database
    // step 07 - remove password and refresh token field from response
    // step 08 - check for user creation
    // step 09 - return response



    // step 01 - get user details from frontend

    const { fullName, email, username, password } = req.body

    // console.log("fullName: ", fullName);
    // console.log("email: ", email);
    // console.log("username: ", username);
    // console.log("password: ", password);
    // console.log("req.body: ", req.body);



    // step 02 - validation - not empty

    // if (
    //     [
    //         fullName,
    //         email,
    //         username,
    //         password
    //     ]
    //     .some((field) => (field?.trim() === ""))
    // ) {
    //     throw new ApiError(400, "All fields are required!")
    // }

    if (fullName === "") {
        throw new ApiError(400, "full name is required")
    }
    
    if (email === "") {
        throw new ApiError(400, "email is required")
    }
    
    if (username === "") {
        throw new ApiError(400, "user name is required")
    }

    if (password === "") {
        throw new ApiError(400, "password is required")
    }



    // step 03 - check if user already exists: username, email
    
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    // console.log("existedUser: ", existedUser);

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }



    // step 04 - check for images, check for avatar
    
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files?.avatar[0]?.path;
    }

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }

    // console.log("avatarLocalPath: ", avatarLocalPath);
    // console.log("coverImageLocalPath: ", coverImageLocalPath);
    // console.log("req.files ", req.files);

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required!")
    }



    // step 05 - upload them to cloudinary, avatar
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // console.log("avatar: ", avatar);
    // console.log("coverImage: ", coverImage);

    if (!avatar) {
        throw new ApiError(400, "avatar file is required!")
    }



    // step 06 - create user object - create entry in database
    
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    // console.log("user ", user);



    // step 07 - remove password and refresh token field from response

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // console.log("createdUser: ", createdUser);



    // step 08 - check for user creation

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the new user")
    }



    // step 09 - return response
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register successfully !!!")
    )

    // console.log("res: ", res);


    // res.status(200)
    // .json({
    //     message: "User register successfully !!!"
    // })
})

// console.log("resterUser: ", registerUser);


export { registerUser }


