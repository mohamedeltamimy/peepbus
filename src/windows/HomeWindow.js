import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { HeaderView, ModifyHomeCard, ChildView } from '../components';
import MapView from 'react-native-maps';

class HomeWindow extends Component {
    render() {
        const { contanier, mapView, headerView } = styles;
        return (
            <View style={contanier}>
           
                <MapView style={mapView} />
                <View style={headerView}>
                    <HeaderView initMenu />
                </View>
                {/* <ModifyHomeCard /> */}
                <ChildView />
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
    }
});

export { HomeWindow };