import React, { createContext, useState } from 'react';

import { signIn } from '../services';

interface AuthContextData {
    token: string;
    handleSignIn(email: string, password: string): Promise<void>;
}

//set initial value of user to null (pre-login)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState('');

    async function handleSignIn(email: string, password: string) {
        const response = await signIn(email, password);

        if (response) setToken(response.metadata.accessToken);
        else throw new Error('login failed');
    }
    return (
        <AuthContext.Provider value={{ token: '', handleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
