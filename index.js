const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("../backend/routes/pins");
const userRoute = require("../backend/routes/users");
dotenv.config();

app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true}).then(()=>{
    console.log("MongoDB connected!")
}).catch((err)=> console.log(err));

app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);
app.listen(8800,()=>{
    console.log("Backend server is on the run");
})