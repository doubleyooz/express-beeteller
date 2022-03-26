import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const NotFound = () => {
    return (
        <div className="notfound-container">
            <div>
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
