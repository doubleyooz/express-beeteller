import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Box from '../../components/Box';
import List from '../../components/List';

import AuthContext from '../../context/AuthProvider';
import { getBoxesData, getLast } from '../../services';
import './styles.scss';

interface box {
    name: string;
    code: string;
    codein: string;
    bid: string;
}

const Home: React.FC = () => {
    const { token, setToken } = useContext(AuthContext);
    const [boxes, setBoxes] = useState<box[]>([]);

    const [loading, setLoading] = useState(true);

    const updateBoxes = useCallback((token: string) => {
        getBoxesData(token)
            .then((result) => {
                setBoxes(result);
            })
            .catch((err) => {
                setToken('');
            });
    }, []);

    useEffect(() => {
        console.log('useEffect once');
        updateBoxes(token);

        setLoading(false);
    }, []); // <-- empty dependency array

    console.log('home-container');
   

    if (token === '') {
        return <Navigate to="/login" />;
    }
    return (
        <div className="home-container">
            <div className="dashboard">
                <div className="header">
                    <span className="title">Moedas</span>
                    <svg
                        onClick={() => updateBoxes(token)}
                        className="r-mrg"
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M23 2V8H17"
                            stroke="#828282"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 18V12H7"
                            stroke="#828282"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.51 6.99959C4.01717 5.56637 4.87913 4.28499 6.01547 3.27501C7.1518 2.26502 8.52547 1.55935 10.0083 1.22385C11.4911 0.888338 13.0348 0.933928 14.4952 1.35636C15.9556 1.77879 17.2853 2.5643 18.36 3.63959L23 7.99959M1 11.9996L5.64 16.3596C6.71475 17.4349 8.04437 18.2204 9.50481 18.6428C10.9652 19.0652 12.5089 19.1108 13.9917 18.7753C15.4745 18.4398 16.8482 17.7342 17.9845 16.7242C19.1209 15.7142 19.9828 14.4328 20.49 12.9996"
                            stroke="#828282"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="cards">
                    {boxes.map((item: box, index: number) => (
                        <Box
                            name={item.code + '/' + item.codein}
                            value={item.bid}
                            description="Dolar Turismo"
                            key={index}
                        />
                    ))}
                </div>
            </div>
            <List/>
        </div>
    );
};

export default React.memo(Home);
