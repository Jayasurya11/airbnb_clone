const mongoose=require("mongoose");
const PlaceModel = require("./place");
const BookingModel = require("./booking");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    wishlist:{
        type:[mongoose.Types.ObjectId],
        ref:PlaceModel,
        default:[]
    },
    hostedlist:{
        type:[String],
        default:[]
    },
    bookedlist:{
        type:[mongoose.Types.ObjectId],
        ref:BookingModel,
        default:[]
        
    }
})

const UserModel= mongoose.model("user",userSchema);
module.exports=UserModel;