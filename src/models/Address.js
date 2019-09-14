import { POST } from './restapi';

const SetAddress = (params, options) => {
    POST(`parents/location/locationUpdate/update`, params, options, {
        authenticationUser: true
    });
}

export { SetAddress };