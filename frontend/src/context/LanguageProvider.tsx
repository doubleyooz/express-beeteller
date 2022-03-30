import React, { createContext, useState } from 'react';
import i18n from '../I18n';

interface LanguageContextData {
    language: string;
    checkLanguage(): Promise<void>;
}

const LanguageContext = createContext<LanguageContextData>(
    {} as LanguageContextData
);

export const LanguageProvider: React.FC = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    async function checkLanguage() {
        if (i18n.language !== currentLanguage)
            i18n.changeLanguage(currentLanguage);
    }
    return (
        <LanguageContext.Provider
            value={{
                language: currentLanguage,
                checkLanguage: checkLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
