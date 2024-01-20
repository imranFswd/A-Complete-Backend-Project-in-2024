


import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-agregate-paginate-v2"



const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: [true, 'Video is required']
        },
        thumbnail: {
            type: String,
            required: [true, 'Video thumbnail is required']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, 'Video title is required']
        },
        description: {
            type: String,
            required: [true, 'Video description is required']
        },
        duration: {
            type: Number,
            required: [true, 'Video duration is required']
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            defaulr: true
        }
    },
    {
        timestamps: true
    }
)



videoSchema.plugin(mongooseAggregatePaginate)



export const Video = mongoose.model("Video", videoSchema)


