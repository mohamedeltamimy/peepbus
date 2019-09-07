import { GET } from './restapi';

const GetTrip = (options) => {
    GET('parents/ride/status', options, {
        authenticationUser: true
    })
}

export { GetTrip };