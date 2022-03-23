import React, {useEffect, useState} from 'react';
import Box from '../../components/Box';
import Item from '../../components/Item';
import api from '../../services';
import './styles.scss';

const Home = () => {
    interface box {
        name: string;
        code: string;
        codein: string;
        bid: string;
    }

    interface chewed {
        high: number;
        low: number;
        varBid: number;
        timestamp: string;
    }


    const [boxes, setBoxes] = useState<box[]>([]);
    const [data, setData] = useState<chewed[]>([]);
    const [currency, setCurrency] = useState<string>("USD-BRL");
    const days = 10;

    let config = {
        headers: {},
    };

    const sort = (n: number) => {
        const arr = [...data]
        switch (n) {
            case 0:
                arr.sort((a, b) => a.low - b.low)
                break;
            case 1:
                arr.sort((a, b) => a.high - b.high)
                break;
            case 2:
                arr.sort((a, b) => a.varBid - b.varBid)
                break;
            default:
               break;

        }        
        setData(arr);
        console.log(data)
    }

    async function getLast10Days() {        
        api.get(`/currencies/lately?currency=${currency}&days=${days}`, config)
            .then((response) => {
                //console.log(response.data.data);
               
                if (response.data !== null) setData(response.data.data);
                else {
                    console.log('get info failed');
                }
            })
            .catch((err) => {
                console.log(err);
                console.log('get info failed');
            });
    }

    async function getBoxesData() {        
        api.get('/currencies/now', config)
            .then((response) => {
                console.log(response.data.data);
                //setState({ feed: response.data });
                if (response.data !== null) setBoxes(response.data.data);
                else {
                    console.log('get info failed');
                }
            })
            .catch((err) => {
                console.log(err);
                console.log('get info failed');
            });
    }

    useEffect(() => {
        getBoxesData();
        getLast10Days();
    }, []); // <-- empty dependency array

    return (
        <div className="home-container">
            <div className="dashboard">
                <div className="header">
                    <span className="title">Moedas</span>
                    <svg
                        onClick={getBoxesData}
                        className="r-mrg"
                       
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                    <select id="currency" defaultValue="0">
                        <option value="0">Dolar Americano</option>
                        <option value="1">Euro</option>
                        <option value="2">Bitcoin</option>
                    </select>
                </div>
               
                <div className="list">
                    <div className="table-head">
                        <div className="label" style={{justifyContent: 'flex-start'}}>
                            <span>Moeda</span>
                        </div>
                        <div className="prices">
                            <div className="label">
                                <span className='long'>Mínimo</span>
                                <span className='short'>Min</span>
                                <svg
                                    onClick={() => sort(0)}
                                    width="15"
                                    height="8"
                                    viewBox="0 0 15 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
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
                                <span className='long'>Máximo</span>
                                <span className='short'>Max</span>
                                <svg
                                    onClick={() => sort(1)}
                                    width="15"
                                    height="8"
                                    viewBox="0 0 15 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
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
                        <div className="label" style={{justifyContent: 'flex-end'}}>
                            <span>Variação</span>
                            <svg
                                onClick={() => sort(2)}
                                width="15"
                                height="8"
                                viewBox="0 0 15 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
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
                    {data.map((item, index) => (
                        <Item
                            key={index}
                            date={item.timestamp}
                            name={'Dolar Americano'}
                            min={item.low}
                            max={item.high}
                            var={item.varBid}
                        />

                    ))}
                   
                </div>
            </div>
        </div>
    );
};

export default Home;
