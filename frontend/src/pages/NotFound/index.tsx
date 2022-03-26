import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';

const NotFound = () => {
    const nav = useNavigate();

    useEffect(() => {
        setTimeout(function () {
            nav('/');
        }, 2000);
    }, []); // <-- empty dependency array

    return (
        <div className="notfound-container">
            <div className="fadeout">
                <span className="error-message-title">
                    There's nothing here.
                </span>
                <span className="error-message-body">
                    Whatever you were looking for doesn't currently exist at
                    this address. Unless you were looking for this error page,
                    in which case: Congrats! You totally found it.
                </span>
            </div>
        </div>
    );
};

export default NotFound;
