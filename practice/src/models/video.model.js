import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema =new Schema(
  {
    videoFile:{
      type:String, //cloudinary url
      required:true
    },
    thumbnail:{
      type:String, //cloudinary url
      required:true
    },
    views:{
      type:Number,
      deafult:0
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps:true
  }
)
videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("Video",videoSchema)