
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-agregate-paginate-v2"



/*
**  video schema
*/

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

// console.log("videoSchema", videoSchema);
// console.log("videoFile: ", videoSchema.videoFile);
// console.log("thumbnail: ", videoSchema.thumbnail);
// console.log("owner: ", videoSchema.owner);
// console.log("title: ", videoSchema.title);
// console.log("description: ", videoSchema.description);
// console.log("duration: ", videoSchema.duration);
// console.log("views: ", videoSchema.views);
// console.log("isPublished: ", videoSchema.isPublished);
// console.log("timestamps: ", videoSchema.timestamps);



videoSchema.plugin(mongooseAggregatePaginate)



export const Video = mongoose.model("Video", videoSchema)

// console.log("Video: ", Video);


