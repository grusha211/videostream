const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require:true,
    },
    path:{
        type:String,
        require: true,
    },
    length:{
        type:Number,
    },
    order: {
        type:Number,
        unique: true,
        autoIncrement: true
    }
});

videoSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastVideo = await mongoose.model('Video').findOne().sort({ order: -1 });
      this.order = lastVideo ? lastVideo.order + 1 : 1;
    }
    next();
  });

module.exports = mongoose.model("Video",videoSchema);