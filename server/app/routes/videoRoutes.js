const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const {videoController} = require("../controllers");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'app/uploads/'); // Directory to store uploaded videos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /mp4|mov|avi|mkv/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb('Error: Videos Only!');
        }
    }
});

const videoRoutes = () => {
  const videoRoutes = express.Router();
  videoRoutes.post("/upload",authMiddleware,upload.single('video'),videoController.createVideo);
  videoRoutes.get("/getall",authMiddleware,videoController.getAllVideo);
  videoRoutes.get("/:id",authMiddleware, videoController.getVideobyId);
  videoRoutes.get("/thumbnail/:id",authMiddleware, videoController.getThumbnail);
  return videoRoutes;
};

module.exports = videoRoutes;
