import { t } from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Item from '../../components/Item';
import AuthContext from '../../context/AuthProvider';
import { getLast, refreshToken } from '../../services';
import './styles.scss';

interface chewed {
    high: number;
    low: number;
    pctChange: string;
    timestamp: string;
}

const currentCurrency = (str: string) => {
    switch (str) {
        case 'USD-BRL':
            return t('dashboard.list.usd-brl');
        case 'EUR-BRL':
            return t('dashboard.list.eur-brl');
        case 'BTC-BRL':
            return t('dashboard.list.btc-brl');
        default:
            return '';
    }
};

const DropdownNav = (props: {
    currencies: string[];
    bringFirst: (str: string) => void;
}) => {
    const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
    const { t, i18n } = useTranslation();

    const bringFirst = (str: string) => {
        props.bringFirst(str);
        setIsDisplayed(!isDisplayed);
    };

    return (
        <div
            className="dropdown-nav"
            style={isDisplayed ? { height: '120px' } : { height: '40px' }}
        >
            <div className="currency-container">
                {props.currencies.map((item, index) => (
                    <div className="currency" key={index}>
                        <span
                            className="long"
                            onClick={
                                props.currencies[0] !== item
                                    ? () => bringFirst(item)
                                    : () => {}
                            }
                        >
                            {currentCurrency(item)}
                        </span>

                        <span
                            className="short"
                            onClick={
                                props.currencies[0] !== item
                                    ? () => bringFirst(item)
                                    : () => {}
                            }
                        >
                            {item}
                        </span>

                        {props.currencies[0] === item && (
                            <div>
                                <svg
                                    onClick={() => setIsDisplayed(!isDisplayed)}
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
    );
};

const List = () => {
    const [currencies, setCurrencies] = useState<string[]>([
        'USD-BRL',
        'EUR-BRL',
        'BTC-BRL',
    ]);

    const bringFirst = (str: string) => {
        const arr = [...currencies];

        arr.sort((a, b) => (a === str ? -1 : b === str ? 1 : 0));

        setCurrencies(arr);
    };

    return (
        <div className="table r-mrg">
            <div className="header">
                <span className="title">{t('dashboard.list.title')}</span>
                <DropdownNav bringFirst={bringFirst} currencies={currencies} />
            </div>
            <div className="list">
                <Items currency={currencies[0]} />
            </div>
        </div>
    );
};

const Items = (props: { currency: string }) => {
    const { t, i18n } = useTranslation();
    const nav = useNavigate();

    const [list, setList] = useState<chewed[]>([]);
    const [loading, setLoading] = useState(true);
    const [isInc, setIsInc] = useState(5);
    const { token, setToken } = useContext(AuthContext);
    const days = 30;

    const increasingly = (n: number) => {
        const arr = [...list];
        switch (n) {
            case 0:
                arr.sort((a, b) => a.low - b.low);
                setIsInc(0);
                break;
            case 1:
                arr.sort((a, b) => a.high - b.high);
                setIsInc(1);
                break;
            case 2:
                arr.sort(
                    (a, b) => parseFloat(a.pctChange) - parseFloat(b.pctChange)
                );
                setIsInc(2);
                break;
            default:
                break;
        }
        setList(arr);
    };

    const decreasingly = (n: number) => {
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
        setIsInc(5);
        setList(arr.reverse());
    };

    const updateList = async () => {
        try {
            const response = await getLast(props.currency, days, token);           
            setList(response.data.data);
            if (response.data.metadata) setToken(response.data.metadata);
        } catch (e) {
            try {
                const temp = await refreshToken();

                setToken(temp.data.accessToken);
                const response = await getLast(
                    props.currency,
                    days,
                    temp.data.accessToken
                );

                setList(response.data.data);
            } catch (e) {
                setToken('');
                nav('/login');
            }
        }
    };

    useEffect(() => {
        updateList();
        setLoading(false);
    }, [props.currency]);

    return (
        <div className="list">
            <div className="table-head">
                <div className="label" style={{ justifyContent: 'flex-start' }}>
                    <span>{t('dashboard.list.label.coins')}</span>
                </div>
                <div className="prices">
                    <div className="label">
                        <span className="long">
                            {t('dashboard.list.label.min.long')}
                        </span>
                        <span className="short">
                            {t('dashboard.list.label.min.short')}
                        </span>
                        <svg
                            className={isInc === 0 ? 'rotate180' : ''}
                            onClick={
                                isInc === 0
                                    ? () => decreasingly(0)
                                    : () => increasingly(0)
                            }
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
                        <span className="long">
                            {t('dashboard.list.label.max.long')}
                        </span>
                        <span className="short">
                            {t('dashboard.list.label.max.short')}
                        </span>
                        <svg
                            className={isInc === 1 ? 'rotate180' : ''}
                            onClick={
                                isInc === 1
                                    ? () => decreasingly(1)
                                    : () => increasingly(1)
                            }
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
                    <span className="long">
                        {t('dashboard.list.label.var.long')}
                    </span>
                    <span className="short">
                        {t('dashboard.list.label.var.short')}
                    </span>
                    <svg
                        className={isInc === 2 ? 'rotate180' : ''}
                        onClick={
                            isInc === 2
                                ? () => decreasingly(2)
                                : () => increasingly(2)
                        }
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
                        name={currentCurrency(props.currency)}
                        min={item.low}
                        max={item.high}
                        pctChange={parseFloat(item.pctChange)}
                    />
                ))
            ) : (
                <div> Loading...</div>
            )}
        </div>
    );
};

export default React.memo(List);