import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HorizontalBar from "./components/HorizontalBar";

const Paths = () => {
  return (
    <div className="routes-container">
      <BrowserRouter>
      <HorizontalBar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Paths;
