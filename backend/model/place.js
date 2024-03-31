const mongoose=require("mongoose")

const placeSchema=new mongoose.Schema({
    hosted_by:String,
    email:String,
    name:String,
    category:String,
    description:String,
    city:String,
    state:String,
    country:String,
    price:Number,
    images:{
        type:[String]
    },
    benefits:[Number],
    guest:Number,
    bed:Number,
    bedroom:Number,
    bathroom:Number

    
    
})

const PlaceModel= mongoose.model("place",placeSchema);
module.exports=PlaceModel;