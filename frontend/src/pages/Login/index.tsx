import React from 'react';
import './styles.scss';

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="image"></div>
            <div className="card">
                <div className="header">
                    <span className="title">Olá! Bem vindo de volta.</span>
                    <br/>
                    <span className="description">
                        Faça Login com seus dados inseridos durante o registro.
                    </span>
                </div>
                <form action="">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" placeholder="Example@email.com" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
