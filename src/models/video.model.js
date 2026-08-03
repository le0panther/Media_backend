import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema(
    {
        videoFile:{
            type:String,
            required:true,
        },
        thumbnail:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        title:{
            type:String,
            required:[true,"Title is mandatory !!!"],
            trim:true
        },
        description:{
            type:String,
            required:[true,"Description is required !!!"],
            trim:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            required:false,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:false
        },

    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)




export const Video = mongoose.model("Video",videoSchema)