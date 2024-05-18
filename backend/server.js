const express = require("express");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.get("/", (req,res)=>{
    res.send("Hey server is running well");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});