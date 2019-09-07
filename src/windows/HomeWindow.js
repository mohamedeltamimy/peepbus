import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, LayoutAnimation, Alert } from 'react-native';
import { HeaderView, ModifyHomeCard, ChildView, ListView, Spinner } from '../components';
import { GetUserInfo, GetTrip } from '../models';
import { L } from '../i18n';
import { GetParentInfo, GetUser } from '../lib';
import { inject, observer } from "mobx-react";
import AsyncStorage from '@react-native-community/async-storage';
import MapView from 'react-native-maps';
import SocketIO from "socket.io-client";

class HomeWindow extends Component {

    state = {
        showChildrenView: false,
        loading: true,
        students: []
    }

    componentDidUpdate() {
        LayoutAnimation.spring();
    }

    async initSocket() {
        const token = await GetUser();
        const {id} = await GetParentInfo();
        GetTrip({
            success: (result) => {
                console.log(result);
            },
            error: () => {}
        });

        this.socket = new SocketIO('http://35.243.244.23:3200/parents', {
            transports: ['websocket', 'polling', 'flashsocket'],
            query: {
                token: `Bearer ${token}`,
                client_id: id,
                ride_id: [3, 4],
                lang: "en",
            }
        });

        this.socket.connect();

        this.socket.on('connect', () => {
            console.log('Wahey -> connected!');
        });

        this.socket.on('studentChangeStatus', (data) => {
            console.log(`[studentChangeStatus] : ${data}`);
        })
        this.socket.on('changeLocation', (data) => {
            console.log('Change location');
            console.log(data);
        })
    }

    async componentDidMount() {
        const parentInfo = await GetParentInfo();
        if(parentInfo) {
            this.setState({students: parentInfo.students});
            this.initSocket();
        }

        GetUserInfo({
            success: (result) => {
                AsyncStorage.setItem('parentInfo', JSON.stringify(result.response));
                this.setState({loading: false});
            },
            error: () => {
               
                this.setState({loading: false});

                setTimeout(() => {
                    Alert.alert(L['fetchPatentIssueTitle'], L['fetchParentIssueMessage'], [{
                        text: L['retryButtonTitle'],
                        onPress: () => {
                            this.setState({loading: true});
                            this.componentDidMount();
                        }
                    }], {
                        cancelable: false
                    });
                }, 500);
            }
        });
    }

    render() {
        const { contanier, mapView, headerView, listView } = styles;
        const { loading, students } = this.state;
        const { isHomeSet } = this.props;
        return (
            <View style={contanier}>
           
                <MapView style={mapView} />
                <View style={headerView}>
                    <HeaderView initMenu />
                </View>

                {isHomeSet && <ListView 
                    style={listView}
                    horizontal
                    data={students}
                    renderItem={(item) => <ChildView item={item} />}
                />}

                {!isHomeSet && <ModifyHomeCard />}
                {loading && <Spinner />}
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    mapView: {
        flex: 1
    },
    headerView: {
        position: 'absolute', 
        top: 0, 
        height: 70, 
        width: width
    },
    listView: {
        position: 'absolute',
        bottom: 20,
        height: 295,
        backgroundColor: 'transparent',
        padding: 10
    }
});


const HomeWindowComponent = inject(stores => {
    return {
        user: stores.store.userStore.user,
        user_token : stores.store.userStore.user_token,
        isHomeSet: stores.store.userStore.isHomeSet,
        setHomeAddress: stores.store.userStore.setHomeAddress
    };
})(observer(HomeWindow));

export { HomeWindowComponent as HomeWindow };
