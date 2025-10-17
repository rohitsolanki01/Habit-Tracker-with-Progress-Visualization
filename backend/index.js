require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth" ,userRoute);


async function connectDb() {
    await mongoose.connect(process.env.MONGO_DB_CONNECTIONS_STRING);
}

connectDb().then( () => {
    console.log("MongoDb Database connected");
}).catch((err) => {
    console.log("MongoDb Database is not connected" , err);
})






app.get("/" , (req,res) => {
    res.send("Server Check end point");
})


app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})