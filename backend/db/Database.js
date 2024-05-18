const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;

const dbConnect = async () => {
    try {
        await mongoose.connect(dbUrl,{});
        console.log("DB Connected successfully");
    } catch (error) {
        console.log("DB Connection Failed ", error.message);
        process.exit(1);
    }
}
module.exports = dbConnect;