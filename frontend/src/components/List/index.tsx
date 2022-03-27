import React, { useContext, useEffect, useMemo, useState } from 'react';
import Item from '../../components/Item';
import AuthContext from '../../context/AuthProvider';
import { getLast } from '../../services';
import './styles.scss';

interface chewed {
    high: number;
    low: number;
    pctChange: string;
    timestamp: string;
}

const List = () => {
    const { token, setToken } = useContext(AuthContext);

    const [list, setList] = useState<chewed[]>([]);
    const [currencies, setCurrencies] = useState<string[]>([
        'USD-BRL',
        'EUR-BRL',
        'BTC-BRL',
    ]);
    const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const days = 30;

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

    const bringFirst = (str: string) => {
        const arr = [...currencies];

        arr.sort((a, b) => (a === str ? -1 : b === str ? 1 : 0));
        setIsDisplayed(!isDisplayed);
        setCurrencies(arr);
    };

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
    useEffect(() => {
        getLast(currencies[0], days, token)
            .then((result) => {
                setList(result);
            })
            .catch((err) => {
                setToken('');
            });
            setLoading(false);
    }, []);

    return (
        <div className="table r-mrg">
            <div className="header">
                <span className="title">Cotações</span>
                <div
                    className="dropdown-nav"
                    style={
                        isDisplayed ? { height: '120px' } : { height: '40px' }
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
    );
};

export default React.memo(List);
