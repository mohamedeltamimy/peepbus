import { POST } from './restapi';

const Login = (params, options) => {
    POST('parents/login', params, options);
}

export { Login };