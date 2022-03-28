import { t } from 'i18next';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const NotFound = () => {
    const nav = useNavigate();

    useEffect(() => {
        setTimeout(function () {
            nav('/');
        }, 2000);
    }, []);

    return (
        <div className="notfound-container">
            <div className="fadeout">
                <span className="error-message-title">
                    {t('notfound.title')}
                </span>
                <span className="error-message-body">{t('notfound.body')}</span>
            </div>
        </div>
    );
};

export default NotFound;
