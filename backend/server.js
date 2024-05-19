const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();

const authRoute = require('./routes/authRoute')
const messageRoute = require('./routes/messageRoute')
const userRoute = require('./routes/userRoute')

const dbConnect = require('./db/Database');

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

//Database connection
dbConnect();

app.get("/", (req,res)=>{
    res.send("Hey server is running well");
});
//mounting routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/users', userRoute);
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});