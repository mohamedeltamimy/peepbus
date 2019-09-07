import { Login, GetUserInfo } from '../models';
import { decorate, action, observable, autorun } from "mobx";
import AsyncStorage from '@react-native-community/async-storage';

class UserStore { 
    @observable
    user = {};

    @observable
    user_token = "";

    @observable
    fetching = true;

    @observable
    isHomeSet = false;

    constructor() {
        autorun(async () => {
            const user_token = await AsyncStorage.getItem('user_token');
            const user = await AsyncStorage.getItem('parentInfo');
            
            this.isHomeSet = await AsyncStorage.getItem('homeAddressSet');

            if (user_token) {
                this.user_token = user_token;

                this.fetching = false;

                if(user) {
                    this.user = JSON.parse(user);
                } else {
                    GetUserInfo({
                        success: (result) => {
                            AsyncStorage.setItem('parentInfo', JSON.stringify(result.response));
                            this.user = result.response;
                        },
                        error: () => {}
                    });
                }
            }
        })
    }

    @action
    login = (params, {success, error}) => {
        Login(params, {
            success: (result) => {
                const token = result.response.user_token.access_token;

                AsyncStorage.setItem('user_token', token);
                
                this.user_token = token; // assign token

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
    setHomeAddress = () => {
        AsyncStorage.setItem('homeAddressSet' , true);
        this.isHomeSet = true;
    }

}

const userStore = new UserStore();

export {userStore}