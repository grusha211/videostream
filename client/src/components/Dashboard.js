import React, { useEffect, useState } from 'react';
import { fetchVideos, fetchUserProgress } from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [videos, setVideos] = useState([]);
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("id"); // Replace with dynamic user ID

        // Fetch videos and user progress
        Promise.all([fetchVideos(), fetchUserProgress(userId)])
            .then(([videosResponse, progressResponse]) => {
                setVideos(videosResponse.data);
                setProgress(progressResponse.data);
            })
            .catch(error => console.error(error));
    }, []);

    const getVideoProgress = (videoId) => {
        const videoProgress = progress.find(p => p.videoId === videoId);
        return videoProgress ? videoProgress.lastStop : 0;
    };

    const isVideoCompleted = (videoId) => {
        const videoProgress = progress.find(p => p.videoId === videoId);
        return videoProgress ? videoProgress.watched : false;
    };

    return (
        <div>
            <h1>Training Dashboard</h1>
            <ul>
                {videos.map(video => (
                    <li key={video._id} style={{ marginBottom: '20px' }}>
                        <Link to={`/video/${video._id}`}>
                            <img
                                src={`http://localhost:8000/video/thumbnail/${video._id}`} // Assuming the thumbnail endpoint
                                alt={`${video.title} thumbnail`}
                                style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
                            />
                            <div>{video.title} - {isVideoCompleted(video._id) ? 'Completed' : 'In Progress'}</div>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/upload">Upload a New Video</Link>
        </div>
    );
};

export default Dashboard;
