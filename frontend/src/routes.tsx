import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import HorizontalBar from './components/HorizontalBar';

const Paths = () => {
    return (
        <div className="routes-container">
            <BrowserRouter>
                <HorizontalBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Paths;
