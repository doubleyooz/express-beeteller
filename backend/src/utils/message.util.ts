const messages: messageOptions = require('./messages.json');

type messageOptions = {
    [key: string]: string;
};

export const getMessage = (path: string) => {
    return messages[path] || null;
};
