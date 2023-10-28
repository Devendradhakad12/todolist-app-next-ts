import mongoose from "mongoose";

let connected = false;

export const ConnectToDB = async() =>{
    mongoose.set('strictQuery',true);
    if(connected){
        console.log('mongoDB is Already Connected')
        return
    }
    try {
          await mongoose.connect(process.env.MONGODB_URI!)
          connected = true
          console.log("MongoDB Connected")
    } catch (error) {
           console.log('DATABASE_ERROR ',error) 
    }
}