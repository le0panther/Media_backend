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
//When building web applications, loading thousands of database records all at once can freeze the user's browser, overwhelm server memory, and cause slow loading times. To solve this, developers use pagination to break large collections into bite-sized chunks, such as showing only 10 or 20 items per page.

//However, implementing pagination manually requires a lot of repetitive, error-prone boilerplate: you have to calculate math offsets to skip the right number of records, run a separate database query to count the total records, compute the total page numbers, and determine whether a next or previous page exists.

//Mongoose Paginate completely eliminates this hassle by automating the entire process in a single function call. You simply specify the current page and the item limit, and the plugin automatically fetches the exact chunk of data, counts total records behind the scenes, and returns a clean, ready-to-use response with your items and all pagination controls (totalPages, hasNextPage, prevPage) directly to your frontend.





export const Video = mongoose.model("Video",videoSchema)