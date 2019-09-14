import { action, observable, autorun } from "mobx";
import { GetTrip } from '../models';
import { socketuri } from '../../app.json';
import { userStore } from '../stores/userStore';
import SocketIO from "socket.io-client";
import _ from 'underscore';

class TripStore { 
    @observable
    trip = {};

    @observable
    runningTrips = [];

    @observable 
    socket = {};

    @action
    getTrips = ({success, error, socketConfig}) => {
        GetTrip({
            success: (result) => {

                if(result.response.status === "active") {
                    _.each(result.response.rides, ({ id }) => {
                        this.runningTrips.push(id);
                    });

                    this.initSocket(socketConfig);
                }

                if(success) {
                    success(result);
                }
            },
            error: () => {
                if(error) {
                    error();
                }
            }
        });
    }

    @action 
    initSocket = ({onConnect, onStudentChangeStatus, onChangeLocation}) => {
        const { user, user_token } = userStore;

        this.socket = new SocketIO(`${socketuri}/parents`, {
            transports: ['websocket', 'polling', 'flashsocket'],
            query: {
                token: `Bearer ${user_token}`,
                client_id: user.client_id,
                ride_id: this.runningTrips,
                lang: "en",
            }
        });

        // .. inital functions for socket
        this.socket.connect();
        this.socket.on('connect', onConnect);
        this.socket.on('studentChangeStatus', onStudentChangeStatus);
        this.socket.on('changeLocation', onChangeLocation);
    }

    @action 
    closeSocket = ({onConnect, onStudentChangeStatus, onChangeLocation}) => {
        //this.socket.close();
        this.socket.off('connect', onConnect);
        this.socket.off('studentChangeStatus', onStudentChangeStatus);
        this.socket.off('changeLocation', onChangeLocation);
    }

}

const tripStore = new TripStore();
export { tripStore }