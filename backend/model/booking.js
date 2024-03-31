const mongoose=require("mongoose");
const PlaceModel = require("./place");
    
const bookingSchema=new mongoose.Schema({
        email:String,
        booked:{
            type:mongoose.Types.ObjectId,
            ref:PlaceModel
            
        },
        start:String, 
        end:String,
        nights:Number
    })
    
const BookingModel= mongoose.model("booking",bookingSchema);
module.exports=BookingModel;