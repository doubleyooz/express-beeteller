import React, { createContext, useState } from 'react';

import { signIn } from '../services';

interface AuthContextData {
    token: string;
    loading: boolean;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    handleSignIn(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    async function handleSignIn(email: string, password: string) {
        const response = await signIn(email, password);

        if (response) setToken(response.data.metadata.accessToken);
        else throw new Error('login failed');
        setLoading(false);
    }
    return (
        <AuthContext.Provider
            value={{
                token: token,
                handleSignIn,
                setToken: setToken,
                loading: loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
