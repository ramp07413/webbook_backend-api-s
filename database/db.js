const mongoose = require("mongoose")
// MONGO_URI =mongodb://localhost:27017 local


const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName : "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("database connected successfully")
    }).catch((error)=>{
        console.log("error connecting to database " + error)
    })
}

module.exports =  connectDB;