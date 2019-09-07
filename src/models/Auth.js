import { POST, GET } from './restapi';

const Login = (params, options) => {
    POST('parents/login', params, options);
}

const GetUserInfo = (options) => {
    GET('parents/data', options, {
        authenticationUser: true
    });
}

const ChangePassword = (params, options) => {
    POST('parents/update/password', params, options, {
        authenticationUser: true
    });
}

export { Login, GetUserInfo, ChangePassword };