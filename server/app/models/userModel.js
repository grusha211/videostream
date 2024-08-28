const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  progress:[{
    videoId: {type: mongoose.Schema.Types.ObjectId,ref: "Video"},
    lastStop: { type: Number, default: 0},
    watched: {type: Boolean, default: false},
  }]

});
module.exports = mongoose.model("User", userSchema);