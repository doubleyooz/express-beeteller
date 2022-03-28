import { useContext } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate, useNavigate } from 'react-router-dom';

import AuthContext from '../../context/AuthProvider';
import { useTranslation } from 'react-i18next';

import './styles.scss';

const LoginPage = () => {
    const { t } = useTranslation();
    const { handleSignIn, token } = useContext(AuthContext);
    const nav = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email(t('yup.email.invalid'))
            .required(t('yup.email.required')),
        password: yup
            .string()
            .min(8, t('yup.password.short'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('yup.password.weak')
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

    const onSubmit = handleSubmit(async (data: User) => {
        handleSignIn(data.email, data.password)
            .then(() => {
                nav('/');
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (token !== '') {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <div className="image"></div>
            <div className="card">
                <div className="header">
                    <span className="title"> {t('login.header.title')}</span>
                    <br />
                    <span className="subtitle">
                        {t('login.header.subtitle')}
                    </span>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="email">{t('login.email.label')}</label>
                        <input
                            {...register('email')}
                            type="email"
                            name="email"
                            placeholder={t('login.email.placeholder')}
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
                            <label htmlFor="password">
                                {t('login.password.label')}
                            </label>
                            <label className="forgot">
                                {t('login.password.forgot')}
                            </label>
                        </div>

                        <input
                            {...register('password')}
                            type="password"
                            name="password"
                            placeholder={t('login.password.placeholder')}
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
