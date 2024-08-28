const mongoose = require("mongoose");

const connectDB = async (vd) => {
    try{
        const db = mongoose.connect(process.env.DBURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.set("debug",false);
        if (vd) vd(db);
    } catch (err){
        console.log("Database not Connected!",err);
    }
};

module.exports = connectDB;