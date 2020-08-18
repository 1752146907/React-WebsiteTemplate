import constant from './application';

const token_key = 'token_' + constant.version;

const member_type_key = 'member_type_' + constant.version;

const open_id_key = 'open_id_' + constant.version;

function clear() {
    localStorage.clear();
}

function getToken() {
    let token = localStorage.getItem(token_key);

    if (token == null || token === 'undefined' || typeof (token) === 'undefined') {
        return '';
    } else {
        return token;
    }
}

function setToken(token) {
    localStorage.removeItem(token);

    localStorage.setItem(token_key, token);
}


function getMemberType() {
    let memberType = localStorage.getItem(member_type_key);

    if (memberType == null || memberType === 'undefined' || typeof (memberType) === 'undefined') {
        return '';
    } else {
        return memberType;
    }
}

function setMemberType(memberType) {
    localStorage.removeItem(member_type_key);

    localStorage.setItem(member_type_key, memberType);
}

function getOpenId() {
    let openId = localStorage.getItem(open_id_key);

    if (openId == null || openId === 'undefined' || typeof (openId) === 'undefined') {
        return '';
    } else {
        return openId;
    }
}

function setOpenId(openId) {
    localStorage.removeItem(open_id_key);

    localStorage.setItem(open_id_key, openId);
}

export default {
    clear: clear,
    getToken: getToken,
    setToken: setToken,
    getMemberType: getMemberType,
    setMemberType: setMemberType,
    getOpenId: getOpenId,
    setOpenId: setOpenId,
};
