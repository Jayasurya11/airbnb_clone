const express=require("express");
const dotenv=require("dotenv");
var jwt = require('jsonwebtoken');
const cors=require("cors")
const bcrypt= require("bcryptjs")
const UserModel=require("./model/user");
const PlaceModel=require("./model/place");
const BookingModel = require("./model/booking");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
 
const mongoose= require("mongoose");


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Mongo Connected")).catch((err)=>console.log(err))


app.get("/",(req,res)=>{
    res.send("Hi This is Jayasurya")
})

// Authentication
app.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    const exist= await UserModel.findOne({email});
    if(exist){
        const validuser= await bcrypt.compare(password,exist.password);
        if(validuser){
            const token=jwt.sign({email:exist.email},"surya",{ expiresIn: '3h' })
            res.cookie("access_token",token).status(200).send({name:exist.name,email:exist.email, wishlist:exist.wishlist, bookedlist:exist.bookedlist})
        }
        else{
            res.send({error:"Email or Password is Incorrect"})
        }
    }
    else{
        res.send({error:"No User Exists"});
    }

})
app.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
    const exist= await UserModel.findOne({email});
    if(exist){
        res.send({error:"User Already Exists"})
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user=  new UserModel({name,email,password:hashedPassword});
    user.save()
    res.send(user);
})

//Upload 
app.post("/become-a-host",async(req,res)=>{
    const{hosted_by,email,name,category,city,state,country, description,guest,bed,bedroom,bathroom,price,images,benefits}=req.body;

    const place=  new PlaceModel({hosted_by,email,name,category,city,state,country, description,guest,bed,bedroom,bathroom,price,images,benefits});
    place.save();
    res.send(place);
})

// update 

app.put("/update-a-place/:id" , async(req,res)=>{
    const {id}=req.params;
    const{hosted_by,email,name,category,city,state,country, description,guest,bed,bedroom,bathroom,price,images,benefits}=req.body;
    const place= await PlaceModel.findOneAndUpdate({_id:id},{hosted_by,email,name,category,city,state,country, description,guest,bed,bedroom,bathroom,price,images,benefits});
    res.send(place);
})
// Get Listings
app.get("/all-places",async (req,res)=>{
    const {filter}=req.query;
    if(filter>0){
        if(filter<=100000){
            const u= await PlaceModel.find({price:{$lte:filter}});
    
            res.send(u);
        }
        else{
            const v= await PlaceModel.find({price:{$gt:filter}});
    
            res.send(v);
        }
    }
    else{
        const places= await PlaceModel.find({});
    
        res.send(places);
    }
    
        
    
    
    
})
app.get("/category/:q",async(req,res)=>{

    const {q}=req.params;
    const {filter}=req.query;
    if(filter>0){
        if(filter<=100000){
            const u= await PlaceModel.find({category:q,price:{$lte:filter}});
    
            res.send(u);
        }
        else{
            const v= await PlaceModel.find({category:q,price:{$gt:filter}});
    
            res.send(v);
        }
    }
    else{
        const places= await PlaceModel.find({category:q});
    
            res.send(places);
    }
        
    

})
//hosted place

app.get("/hosted-places/:q",async(req,res)=>{
    const {q}=req.params;
    const places= await PlaceModel.find({email:q});
    
    res.send(places);
    
})
// get a place
app.get("/place-by-id/:id",async(req,res)=>{
    const {id}=req.params;
    
    const place=  await PlaceModel.findOne({_id:id});
   
    res.send(place);
})

//search results
app.get("/search/:q",async(req,res)=>{
    const {q}=req.params;
    const {filter}=req.query;
    if(filter>0){
        if(filter<=100000){
            const search_by_city=   await PlaceModel.find({city:{$regex:q,$options:"i"},price:{$lte:filter}});
            if(q!=="NA"){
                var state_one=  await PlaceModel.find({state:{$regex:q,$options:"i"},price:{$lte:filter}});
            }
            
            if (search_by_city.length>0){
                res.send(search_by_city)
            }
            else if(state_one.length>0){
                res.send(state_one)
            }
            else{
                res.send([])
            }
        }
        else{
            const search_by_city=   await PlaceModel.find({city:{$regex:q,$options:"i"},price:{$gt:filter}});
            if(q!=="NA"){
                var state_two=  await PlaceModel.find({state:{$regex:q,$options:"i"},price:{$gt:filter}});
            }   
            
            if (search_by_city.length>0){
                res.send(search_by_city)
            }
            else if(state_two.length>0){
                res.send(state_two)
            }
            else{
                res.send([])
            }
        }
    }
    else{
        const search_by_city=   await PlaceModel.find({city:{$regex:q,$options:"i"}});
        if(q!=="NA"){
            var state_three=  await PlaceModel.find({state:{$regex:q,$options:"i"}});
        }
        if (search_by_city.length>0){
            res.send(search_by_city)
        }
        else if(state_three.length>0){
            res.send(state_three)
        }
        else{
            res.send([])
        }
    }
    

})
app.get("/get-wish-list/:q",async(req,res)=>{
    const {q}=req.params;
    const response= await UserModel.findOne({email:q}).populate("wishlist").exec();
    res.send(response);
})
app.put("/wish-list/:q/:id",async(req,res)=>{
    
    const {q,id}=req.params;
    const user= await UserModel.findOne({email:q});
    // const place= await PlaceModel.find({_id:id});
    const curr=user.wishlist;
    if(!curr.includes(id)){
        curr.push(id);
        const r=await UserModel.findOneAndUpdate({email:q},{wishlist:[...curr]},{new:true});

        res.send(r);
    }
    else{
        const updated= curr.filter((item)=>item!=id);
        const v= await UserModel.findOneAndUpdate({email:q},{wishlist:[...updated]},{new:true});
        res.send(v);
    }
    
    

})
// booking 

app.post("/booking/:email/:id",async(req,res)=>{
    const {email,id}=req.params;
    const user=await UserModel.findOne({email});
    const {st,en,nights}=req.body;
    
    const start=`${st.date>9?st.date:`0${st.date}`}-${st.month>8?st.month+1:`0${st.month+1}`}-${st.year}`.toString()
    const end= `${en.date>9?en.date:`0${en.date}`}-${en.month>8?en.month+1:`0${en.month+1}`}-${en.year}`.toString()
    
    const booking=await BookingModel.create({start,end,booked:id,nights})
    
    const v=await BookingModel.findOne({booked:id});
    
    const y=user.bookedlist;
    y.push(v._id);
    const response=await UserModel.findOneAndUpdate({email},{bookedlist:[...y]},{new:true});

    res.send(response);
   
  

})
// get booked 

app.get("/booked-places/:email",async(req,res)=>{
    const {email}=req.params;
    const user=await UserModel.findOne({email}).populate("bookedlist").exec();
    const bookedplaces=[];
    for(let p of user.bookedlist){
        const b= await BookingModel.findOne({_id:p._id}).populate("booked").exec();
        bookedplaces.push(b);

    }  
    
   res.send({places:bookedplaces})



})
app.listen(7000,()=>{
    console.log("Backend listening on port 7000");
})