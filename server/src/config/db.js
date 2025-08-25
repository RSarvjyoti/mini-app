const {connect} = require("mongoose");

const connectDB = async (url) => {
    try{
        await connect(url);
        console.log("Database connected");
        
    }catch(err){
        console.log("database connection error", err);   
    }
}

module.exports = connectDB;