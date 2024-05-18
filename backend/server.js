const express = require("express");
const app = express();
require('dotenv').config();
const dbConnect = require('./db/Database');
const authRoute = require('./routes/authRoute')
const messageRoute = require('./routes/messageRoute')
const userRoute = require('./routes/userRoute')

const PORT = process.env.PORT || 4000;
app.use(express.json());

//Database connection
dbConnect();

app.get("/", (req,res)=>{
    res.send("Hey server is running well");
});
//mounting routes
app.use('/api/v1', authRoute);
app.use('/api/v1', messageRoute);
app.use('/api/v1', userRoute);
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});