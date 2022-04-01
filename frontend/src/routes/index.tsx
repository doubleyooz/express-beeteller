import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';

import HorizontalBar from '../components/HorizontalBar';
import NotFound from '../pages/NotFound';
import LanguageContext from '../context/LanguageProvider';
import { refreshToken } from '../services';

const Paths: React.FC = () => {   
    const { language, checkLanguage } = useContext(LanguageContext);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        checkLanguage().then().catch();
       
        if (sessionStorage.getItem(process.env.REACT_APP_JWT!) === '') {
            refreshToken()
                .then((result) => {
                    console.log(result.data)
                    if (result) sessionStorage.setItem(process.env.REACT_APP_JWT!, result.data.accessToken);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        } else setLoading(false);
    }, []);

    return (
        <div className="routes-container">
            {!loading ? (
                <BrowserRouter>
                    <HorizontalBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Paths;
