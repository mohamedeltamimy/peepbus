import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, PermissionsAndroid, Platform, Alert } from 'react-native';
import { HeaderView, Button, Icon, Spinner } from '../components';
import MapView from 'react-native-maps';
import { L } from '../i18n';
import { inject, observer } from "mobx-react";
import RNSettings from 'react-native-settings';

class SetHomeLocationWindow extends Component {
    state = {}


    componentDidMount() {
        if (Platform.OS === "ios") {
            this.getCurrentPosition();
            return;
        }

        this.requestLocationAccess();
    }

    // .. request location
    async requestLocationAccess() {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted) {
            this.checkLocationService();
        } else {
            this.requestLocationAccess();
        }
    }

    // .. check location 
    checkLocationService() {
        RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
            if (result == RNSettings.ENABLED) {
                this.getCurrentPosition();
            } else {
                this.setState({
                    showLocationError: true
                });
            }
        })
    }

    saveButtonPressed() {
        Alert.alert(L['changeAddressConfirmationTitle'], L['changeAddressConfirmationMessage'], [{
            text: L['yesButtonTitle'],
            onPress: () => {
                this.props.setHomeAddress({
                    address: "address temp",
                    lat: String(this.state.latitude),
                    lng: String(this.state.longitude)
                }, {
                    success: (result) => {
                        console.log(result);
                    },
                    error: () => {}
                });
            }
        }, {
            text: L['noButtonTitle']
        }]);
    }

    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            this.refs.mapView.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });

            this.setState({
                latitude: latitude,
                longitude: longitude
            });
        }, (error) => {
        }, {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        });
    }

    render() {
        const { contanier, mapView, headerView, setHomeLocaitonButton, iconStyle } = styles;
        const { loading } = this.state;
        return (
            <View style={contanier}>
                <MapView style={mapView}
                    ref={'mapView'}
                    onRegionChange={(coords) => {
                        this.setState({ longitude: coords.longitude, latitude: coords.latitude })
                    }} />

                <Icon
                    style={iconStyle}
                    size={40}
                    icon={"md-pin"}
                    color={'red'}
                    isDisable={true} />

                <View style={headerView}>
                    <HeaderView title={L['setHomeLocationWindowTitle']} />
                </View>
                <Button style={setHomeLocaitonButton} title={L['setHomeLocaitonButtonTitle']} onPress={() => this.saveButtonPressed()} />
                {loading && <Spinner />}
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        justifyContent: 'center'
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
    setHomeLocaitonButton: {
        position: 'absolute',
        width: width - 96,
        height: 48,
        alignSelf: 'center',
        bottom: 30
    },
    iconStyle: {
        alignSelf: 'center',
        position: 'absolute'
    }
});


const SetHomeLocationWindowComponent = inject(stores => {
    return {
        setHomeAddress: stores.store.userStore.setHomeAddress
    };
})(observer(SetHomeLocationWindow));

export { SetHomeLocationWindowComponent as SetHomeLocationWindow };
