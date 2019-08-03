import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { HeaderView, Button } from '../components';
import MapView from 'react-native-maps';
import { L } from '../i18n';

class SetHomeLocationWindow extends Component {
    render() {
        const { contanier, mapView, headerView, setHomeLocaitonButton } = styles;
        return (
            <View style={contanier}>
               <MapView style={mapView} />
                <View style={headerView}>
                    <HeaderView title={L['setHomeLocationWindowTitle']} />
                </View>
                <Button style={setHomeLocaitonButton} title={L['setHomeLocaitonButtonTitle']} />
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
    setHomeLocaitonButton: {
        position: 'absolute',
        width: width - 96,
        height: 48,
        alignSelf: 'center',
        bottom: 30
    }
});

export { SetHomeLocationWindow };