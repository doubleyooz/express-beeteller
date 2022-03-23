import React from 'react';
import Box from '../../components/Box';
import './styles.scss';

const Home = () => {
    return (
        <div className="home-container">
            <div className="dashboard">
                <div className="header">
                    <span className="title">Moedas</span>
                    <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23 2V8H17"
                            stroke="#828282"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M1 18V12H7"
                            stroke="#828282"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M3.51 6.99959C4.01717 5.56637 4.87913 4.28499 6.01547 3.27501C7.1518 2.26502 8.52547 1.55935 10.0083 1.22385C11.4911 0.888338 13.0348 0.933928 14.4952 1.35636C15.9556 1.77879 17.2853 2.5643 18.36 3.63959L23 7.99959M1 11.9996L5.64 16.3596C6.71475 17.4349 8.04437 18.2204 9.50481 18.6428C10.9652 19.0652 12.5089 19.1108 13.9917 18.7753C15.4745 18.4398 16.8482 17.7342 17.9845 16.7242C19.1209 15.7142 19.9828 14.4328 20.49 12.9996"
                            stroke="#828282"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <div className="cards">
                    <Box
                        name="BRL / USD"
                        value="5,30"
                        description="Dolar Turismo"
                    />
                    <Box name="BTC / EUR" value="3732,09" description="Euro" />
                    <Box
                        name="BTC / USD"
                        value="4241,60"
                        description="Dolar Turismo"
                    />
                </div>
            </div>

            <div className="list">
                <div className="header">
                    <span className="title">Cotações</span>
                    <select id="currency">
                        <option value="Dolar Americano" selected>Dolar Americano</option>
                        <option value="Euro">Euro</option>
                        <option value="Bitcoin">
                            Bitcoin
                        </option>                     
                    </select>
                </div>

                <div className="days">
                   
                </div>
            </div>
        </div>
    );
};

export default Home;
