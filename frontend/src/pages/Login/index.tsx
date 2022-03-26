import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services';
import './styles.scss';

const LoginPage = () => {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Email should have correct format')
            .required('Email is a required field'),
        password: yup
            .string()
            .min(8, 'Password is too short - must be 8 chars minimum.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                'the password must contain at least 1 number, at least 1 lower case letter, at least 1 upper case and at least 1 special character.'
            ),
    });

    type User = {
        email: string;
        password: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = handleSubmit((data: User) => {
        api.get(`/sign-in`, {
            auth: {
                username: data.email,
                password: data.password,
            },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
                console.log('get info failed');
            });
    });
    return (
        <div className="login-container">
            <div className="image"></div>
            <div className="card">
                <div className="header">
                    <span className="title">Olá! Bem vindo de volta.</span>
                    <br />
                    <span className="subtitle">
                        Faça Login com seus dados inseridos durante o registro.
                    </span>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            {...register('email')}
                            type="email"
                            name="email"
                            placeholder="Example@email.com"
                            style={
                                errors.email ? { borderColor: '#ff0000' } : {}
                            }
                        />
                        {errors.email && (
                            <div className="error">
                                <span>{errors.email.message}</span>
                            </div>
                        )}
                    </div>
                    <div className="field">
                        <div className="field up">
                            <label htmlFor="password">Senha</label>
                            <label className="forgot">Esqueceu a senha</label>
                        </div>

                        <input
                            {...register('password')}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            style={
                                errors.password
                                    ? { borderColor: '#ff0000' }
                                    : {}
                            }
                        />
                        {errors.password && (
                            <div className="error">
                                <span>{errors.password.message}</span>
                            </div>
                        )}
                    </div>

                    <input
                        className="submit"
                        type="submit"
                        value="Login"
                        disabled={
                            errors.password || errors.email ? true : false
                        }
                        style={
                            errors.password || errors.email
                                ? { backgroundColor: '#eed99e' }
                                : {}
                        }
                    />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
