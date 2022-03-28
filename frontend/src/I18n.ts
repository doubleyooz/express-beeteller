import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    dashboard: {
                        'box.title': 'Coins',
                        'box.usd-brl': 'Dollar Real',
                        'box.btc-eur': 'Bitcoin Euro',
                        'box.btc-usd': 'Bitcoin Dollar',

                        'list.usd-brl': 'American Dollar',
                        'list.eur-brl': 'Euro',
                        'list.btc-brl': 'Bitcoin',
                        'list.title': 'Quotation',

                        'list.label.coins': 'Coin',
                        'list.label.min.long': 'Minimun',
                        'list.label.min.short': 'Min',
                        'list.label.max.long': 'Maximun',
                        'list.label.max.short': 'Max',
                        'list.label.var.long': 'Variation',
                        'list.label.var.short': 'Var',
                    },
                    notfound: {
                        title: "There's nothing here.",
                        body: "Whatever you were looking for doesn't currently exist at this address. Unless you were looking for this error page, in which case: Congrats! You totally found it.",
                    },
                    yup: {
                        'email.invalid': 'Email should have correct format',
                        'email.required': 'Email is a required field',

                        'password.weak':
                            'the password must contain at least 1 number, at least 1 lower case letter, at least 1 upper case and at least 1 special character.',

                        'password.short':
                            'Password is too short - must be 8 chars minimum.',
                    },
                    login: {
                        'header.title': 'Hello! Welcome Back.',
                        'header.subtitle':
                            'Please Login with the data inserted during registration',

                        'email.label': 'Email',
                        'email.placeholder': 'Example@email.com',
                        'password.label': 'Password',
                        'password.placeholder': 'Enter Password',
                        'password.forgot': 'Forgot password?',

                        'submit.button': 'Login',
                    },
                    navbar: {
                        activity: 'QUOTATIONS',
                    },
                },
            },
            pt: {
                translation: {
                    dashboard: {
                        'box.title': 'Moedas',
                        'box.usd-brl': 'Dolar Real',
                        'box.btc-eur': 'Bitcoin Euro',
                        'box.btc-usd': 'Bitcoin Dolar',

                        'list.usd-brl': 'Dólar Americano',
                        'list.btc-eur': 'Euro',
                        'list.btc-usd': 'Bitcoin',
                        'list.title': 'Cotações',

                        'list.label.coins': 'Moeda',
                        'list.label.min.long': 'Mínimo',
                        'list.label.min.short': 'Min',
                        'list.label.max.long': 'Máximo',
                        'list.label.max.short': 'Max',
                        'list.label.var.long': 'Variação',
                        'list.label.var.short': 'Var',
                    },
                    notfound: {
                        title: 'Não há nada aqui.',
                        body: 'Seja lá o que você estiver procurando não existe nesse endereço. A menos que você estava procurando por essa página de Erro, nesse caso: Parabéns! Você com certeza encontrou ela.',
                    },
                    yup: {
                        'email.invalid': 'Email deve ter um formato válido',
                        'email.required': 'Email é um campo obrigatório',

                        'password.weak':
                            'A senha deve conter ao menos 1 número, ao menos uma letra minúscula, ao menos 1 letra maiscúla e ao menos 1 caractere especial.',

                        'password.short':
                            'A senha é muita curta - ela deve ter 8 caracteres no mínimo.',
                    },

                    login: {
                        'header.title': 'Olá! Bem vindo de volta.',
                        'header.subtitle':
                            ' Faça Login com seus dados inseridos durante o registro.',

                        'email.label': 'E-mail',
                        'email.placeholder': 'Exemplo@email.com',
                        'password.label': 'Senha',
                        'password.placeholder': 'Digite a senha',
                        'password.forgot': 'Esqueceu a senha?',

                        'submit.button': 'Login',
                    },
                    navbar: {
                        activity: 'COTAÇÕES',
                    },
                },
            },
        },
    });

export default i18n;
