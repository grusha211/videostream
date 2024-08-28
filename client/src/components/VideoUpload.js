import React, { useState } from 'react';
import { uploadVideo } from '../services/authService';

const VideoUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem("token");

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if video file is selected
        if (!videoFile) {
            setMessage('Please select a video file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('length', length);
        formData.append('video', videoFile);

        try {
            const response = await uploadVideo(formData,token);

            setMessage('Video uploaded successfully!',response);
        } catch (error) {
            console.error('Error uploading video:', error);
            setMessage('Failed to upload video.');
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload a Video</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="length">Length (in seconds):</label>
                    <input
                        type="number"
                        id="length"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="video">Video File:</label>
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload Video</button>
            </form>
        </div>
    );
};

export default VideoUpload;
