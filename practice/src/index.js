import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import connectDB from "./db";
dotenv.config({path:`./.env`})

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is running at port:${process.env.PORT}`)
  })
})
.catch((error) =>{
  console.log("MONGO DB connection failed",err);
})