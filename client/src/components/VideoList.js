import React from 'react';
import { Link } from 'react-router-dom';

const VideoList = ({ videos, progress }) => {
    const isVideoCompleted = (videoId) => {
        const videoProgress = progress.find(p => p.videoId === videoId);
        return videoProgress ? videoProgress.completed : false;
    };

    return (
        <ul>
            {videos.map(video => (
                <li key={video._id}>
                    <Link to={`/video/${video._id}`}>
                        {video.title} - {isVideoCompleted(video._id) ? 'Completed' : 'In Progress'}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default VideoList;
