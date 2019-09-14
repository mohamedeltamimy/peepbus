import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, LayoutAnimation, Image } from 'react-native';
import { HeaderView, ModifyHomeCard, ChildView, ListView, Spinner } from '../components';
import { L } from '../i18n';
import { GetParentInfo } from '../lib';
import { inject, observer } from "mobx-react";
import MapView, {Marker} from 'react-native-maps';
import Carousel from 'react-native-banner-carousel';

class HomeWindow extends Component {

    state = {
        showChildrenView: false,
        loading: true,
        students: [],
        region: {
            latitude: 0,
            longitude: 0,
            longitudeDelta: 0.1,
            latitudeDelta: 0.1
        }
    }

    socketConfig = {
        onConnect: this.onConnect.bind(this),
        onStudentChangeStatus: this.onStudentChangeStatus.bind(this),
        onChangeLocation: this.onChangeLocation.bind(this)
    }

    componentDidUpdate() {
        LayoutAnimation.spring();
    }

    async initSocket() {
        this.props.getTrips({
            success: (result) => {
                this.setState({loading: false});

                if(result.response.status === "active") {

                }
            },
            error: () => {
                this.setState({loading: false});
            },
            socketConfig: this.socketConfig
        });
    }

    onConnect() {
        console.log('Connected !!!');
    }

    onStudentChangeStatus() {
        console.log('Student changed !!!');
    }

    onChangeLocation (data) {

        this.setState({
            region: {
                latitude: __DEV__ ? 30.1693532 : data.data.lat,
                longitude: __DEV__ ? 31.5619852 : data.data.lng,
                longitudeDelta: 0.1,
                latitudeDelta: 0.1
            }
        });
    }

    async componentDidMount() {
        const parentInfo = await GetParentInfo();
        if(parentInfo) {
            this.setState({students: parentInfo.students});
            this.initSocket();
        }
    }

    render() {
        const { contanier, mapView, headerView, listView, busIcon } = styles;
        const { loading, students, region } = this.state;
        const { isHomeSet, user } = this.props;

        return (
            <View style={contanier}>
           
                <MapView style={mapView} region={region}>
                    <Marker coordinate={region}>
                        <Image style={busIcon} source={require('../assets/busNavigationIcon.png')} />
                    </Marker>
                </MapView>
                    
                <View style={headerView}>
                    <HeaderView initMenu />
                </View>

               {isHomeSet && 
                <View style={listView}>
                    <Carousel
                        autoplay={false}
                        loop={false}
                        index={0}
                        pageSize={width}
                        onPageChanged={(index) => {
                            console.log(index);
                        }}>
                            {students.map((item, index) => <ChildView item={item} />)}
                        </Carousel>
                    </View>
                }

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
        height: 320,
        backgroundColor: 'transparent',
        padding: 10
    },
    busIcon: {
        height: 40,
        width: 40
    }
});


const HomeWindowComponent = inject(stores => {
    return {
        user: stores.store.userStore.user,
        user_token : stores.store.userStore.user_token,
        isHomeSet: stores.store.userStore.isHomeSet,
        setHomeAddress: stores.store.userStore.setHomeAddress,
        getTrips: stores.store.tripStore.getTrips,
        closeSocket: stores.store.tripStore.closeSocket
    };
})(observer(HomeWindow));

export { HomeWindowComponent as HomeWindow };
