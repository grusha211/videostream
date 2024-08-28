import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 
const token = localStorage.getItem("token");

// Fetch all videos
export const fetchVideos = async () => {
    const config = {
        headers: { 'x-auth-token': token }
      };
      const response = await axios.get(`${API_BASE_URL}/video/getall`, config);
      return response.data;
};

// Fetch user progress
export const fetchUserProgress = (userId) => {
    const config = {
        headers: { 'x-auth-token': token }
      };
    return axios.get(`${API_BASE_URL}/user/progress/${userId}`, config);
};

// Update user progress
export const updateUserProgress = (userId, progressData) => {
    return axios.post(`${API_BASE_URL}/user/${userId}/progress`, progressData);
};
