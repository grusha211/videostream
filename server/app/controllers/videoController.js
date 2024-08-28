const Video = require("../models/videoModel");
const thumbsupply = require('thumbsupply');
const fs = require("fs");

class videoController{
    
    static async createVideo(req, res) {
        // Check if a file has been uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded.' });
        }

        const { title, description } = req.body;
        const path = req.file.path; 
        const length = req.file.duration;
        // Get the path of the uploaded file

        try {
            const newVideo = new Video({ title, description, path, length });
            await newVideo.save();
            res.status(201).json(newVideo);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
    static async getVideobyId(req,res){
        const id = req.params;
        try{
            const video = await Video.findById(id);
            res.status(201).json(video);
        } catch(error){
            res.status(500).json({message: "server error", error});
        }
    }
    static async getAllVideo(req,res){
        try{
            const videos = await Video.find();
            res.json(videos);
        } catch(error){
            res.status(500).json({message: "server error",error});
        }
    }

    static async getThumbnail(req,res){
        const id = req.params;
        const video = await Video.findById(id);
             const file = await thumbsupply.generateThumbnail("../uploads/1724834343919-Video1.mp4");   
    }
}

module.exports = videoController;