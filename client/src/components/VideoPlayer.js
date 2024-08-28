import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import { fetchUserProgress, updateUserProgress } from '../api';

const VideoPlayer = () => {
    const { id } = useParams();
    const history = useNavigate();
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [userId] = useState('user_id_here'); // Replace with dynamic user ID

    useEffect(() => {
        const fetchProgressAndPlay = async () => {
            try {
                const progressResponse = await fetchUserProgress(userId);
                const progress = progressResponse.data.find(p => p.videoId === id);

                playerRef.current = videojs(videoRef.current, {
                    controls: true,
                    playbackRates: [1, 1.5, 2],
                });

                if (progress && progress.lastPosition) {
                    playerRef.current.currentTime(progress.lastPosition);
                }

                playerRef.current.on('timeupdate', () => {
                    const currentTime = playerRef.current.currentTime();
                    updateUserProgress(userId, {
                        videoId: id,
                        lastPosition: currentTime,
                        completed: false,
                    });
                });

                playerRef.current.on('ended', () => {
                    updateUserProgress(userId, {
                        videoId: id,
                        lastPosition: playerRef.current.duration(),
                        completed: true,
                    });
                    history.push('/');
                });
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };

        fetchProgressAndPlay();

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [id, userId, history]);

    return (
        <div>
            <h2>Video Player</h2>
            <video ref={videoRef} className="video-js" controls preload="auto"></video>
        </div>
    );
};

export default VideoPlayer;
