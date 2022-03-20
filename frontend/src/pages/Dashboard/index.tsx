import React from 'react';
import Box from '../../components/Box';
import './styles.scss';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="card-container">
                <div className="header">
                    <span className="title">MOEDAS</span>
                </div>
                
                <div className="cards">
                    <Box
                        name="BRL/USD"
                        price="5,30"
                        description="Dolar Turismo"
                    />
                    <Box name="BTC/EUR" price="3732,09" description="Euro" />
                    <Box
                        name="BTC/USD"
                        price="4241,60"
                        description="Dolar Turismo"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
