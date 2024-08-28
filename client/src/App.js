import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VideoUpload from './components/VideoUpload'; 
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (<div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                    <Route path="/upload" element={<PrivateRoute element={VideoUpload} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
