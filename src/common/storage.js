import constant from './constant';

const open_id_key = 'open_id_' + constant.version;
const token_key = 'token_' + constant.version;

const primary_token_key = 'primary_token_' + constant.version;
const junior_token_key = 'junior_token_' + constant.version;
const transfer_token_key = 'transfer_token_' + constant.version;



function getOpenId() {
    if (constant.is_test) {
        if (constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279') {
            return 'oqvzXv4c-FY2-cGh9U-RA4JIrZoc';
        } else {
            return 'oXxTjwoBVyBquUAAx3RaFow62zjA';
        }
    }
    return localStorage.getItem(open_id_key);
}

function setOpenId(open_id) {
    localStorage.setItem(open_id_key, open_id);
}

function getToken() {
    let token = localStorage.getItem(token_key);

    if (constant.is_test) {
        token = '8sJgFZkMMgLUPfF9dvJB0kqou5YYz7OBpHBnSIz7y/fMLJQYUAbBFzXE9GlYFHOo/0yKhg3ARlxntdZeK6jJcReT7cqlJ1bmRxZ56PFGm7s=';
    }

    if (token === null) {
        return '';
    } else {
        return token;
    }
}

function setToken(token) {
    localStorage.clear();

    localStorage.setItem(token_key, token);
}

function getPrimaryToken() {
    let token = localStorage.getItem(primary_token_key);

    if (token === null) {
        return '';
    } else {
        return token;
    }
}

function setPrimaryToken(token) {
    localStorage.clear();

    localStorage.setItem(primary_token_key, token);
}

function getJuniorToken() {
    let token = localStorage.getItem(junior_token_key);

    if (token === null) {
        return '';
    } else {
        return token;
    }
}

function setJuniorToken(token) {
    localStorage.clear();

    localStorage.setItem(junior_token_key, token);
}

function getTransferToken() {
    let token = localStorage.getItem(transfer_token_key);

    if (token === null) {
        return '';
    } else {
        return token;
    }
}

function setTransferToken(token) {
    localStorage.clear();

    localStorage.setItem(transfer_token_key, token);
}

export default {
    getOpenId: getOpenId,
    setOpenId: setOpenId,
    getToken: getToken,
    setToken: setToken,
    getPrimaryToken: getPrimaryToken,
    setPrimaryToken: setPrimaryToken,
    getJuniorToken: getJuniorToken,
    setJuniorToken: setJuniorToken,
    getTransferToken: getTransferToken,
    setTransferToken: setTransferToken
};
