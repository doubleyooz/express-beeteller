import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Box from '../../components/Box';
import Item from '../../components/Item';
import AuthContext from '../../context/AuthProvider';
import { getBoxesData, getLast } from '../../services';
import './styles.scss';

interface box {
    name: string;
    code: string;
    codein: string;
    bid: string;
}

interface chewed {
    high: number;
    low: number;
    pctChange: string;
    timestamp: string;
}


const Home: React.FC = () => {
    const { token, setToken } = useContext(AuthContext);
    const [boxes, setBoxes] = useState<box[]>([]);
    const [list, setList] = useState<chewed[]>([]);
    const [currencies, setCurrencies] = useState<string[]>([
        'USD-BRL',
        'EUR-BRL',
        'BTC-BRL',
    ]);
    const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const days = 30;

    const bringFirst = (str: string) => {
        const arr = [...currencies];

        arr.sort((a, b) => (a === str ? -1 : b === str ? 1 : 0));
        setIsDisplayed(!isDisplayed);
        setCurrencies(arr);
    };

    const sort = (n: number) => {
        const arr = [...list];
        switch (n) {
            case 0:
                arr.sort((a, b) => a.low - b.low);
                break;
            case 1:
                arr.sort((a, b) => a.high - b.high);
                break;
            case 2:
                arr.sort(
                    (a, b) => parseFloat(a.pctChange) - parseFloat(b.pctChange)
                );
                break;
            default:
                break;
        }
        setList(arr);
    };

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

        getLast(currencies[0], days, token)
            .then((result) => {
                setList(result);
            })
            .catch((err) => {
                setToken('');
            });
        setLoading(false);
    }, []); // <-- empty dependency array

    useEffect(() => {
        console.log('List');
        getLast(currencies[0], days, token)
            .then((result) => {
                if (result) setList(result);
            })
            .catch((err) => {
                setToken('');
            });
    }, [currencies]);

    console.log('home-container');
    const currentCurrency = (str: string) => {
        switch (str) {
            case 'USD-BRL':
                return 'Dolar Americano';
            case 'EUR-BRL':
                return 'Euro';
            case 'BTC-BRL':
                return 'Bitcoin';
            default:
                return '';
        }
    };

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

            <div className="table r-mrg">
                <div className="header">
                    <span className="title">Cotações</span>
                    <div
                        className="dropdown-nav"
                        style={
                            isDisplayed
                                ? { height: '120px' }
                                : { height: '40px' }
                        }
                    >
                        <div className="currency-container">
                            {currencies.map((item, index) => (
                                <div className="currency" key={index}>
                                    <span
                                        className="long"
                                        onClick={
                                            currencies[0] !== item
                                                ? () => bringFirst(item)
                                                : () => {}
                                        }
                                    >
                                        {currentCurrency(item)}
                                    </span>

                                    <span
                                        className="short"
                                        onClick={
                                            currencies[0] !== item
                                                ? () => bringFirst(item)
                                                : () => {}
                                        }
                                    >
                                        {item}
                                    </span>

                                    {currencies[0] === item && (
                                        <div>
                                            <svg
                                                onClick={() =>
                                                    setIsDisplayed(!isDisplayed)
                                                }
                                                viewBox="0 0 15 8"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.5 1L7.5 7L13.5 1"
                                                    stroke="#828282"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="list">
                    <div className="table-head">
                        <div
                            className="label"
                            style={{ justifyContent: 'flex-start' }}
                        >
                            <span>Moeda</span>
                        </div>
                        <div className="prices">
                            <div className="label">
                                <span className="long">Mínimo</span>
                                <span className="short">Min</span>
                                <svg
                                    onClick={() => sort(0)}
                                    width="15"
                                    height="8"
                                    viewBox="0 0 15 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.5 1L7.5 7L13.5 1"
                                        stroke="#828282"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <div className="label">
                                <span className="long">Máximo</span>
                                <span className="short">Max</span>
                                <svg
                                    onClick={() => sort(1)}
                                    width="15"
                                    height="8"
                                    viewBox="0 0 15 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.5 1L7.5 7L13.5 1"
                                        stroke="#828282"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="label v">
                            <span className="long">Variação</span>
                            <span className="short">Var</span>
                            <svg
                                onClick={() => sort(2)}
                                width="15"
                                height="8"
                                viewBox="0 0 15 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.5 1L7.5 7L13.5 1"
                                    stroke="#828282"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    {!loading ? (
                        list.map((item, index) => (
                            <Item
                                key={index}
                                date={item.timestamp}
                                name={currentCurrency(currencies[0])}
                                min={item.low}
                                max={item.high}
                                pctChange={parseFloat(item.pctChange)}
                            />
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Home);
