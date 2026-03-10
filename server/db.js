const mongoose  = require("mongoose");
const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/netmorph");
        console.log("MONGODB connected");

    }catch(error){
        console.log("MONGODB connection error",error);
    }
}
module.exports = connectDB;