import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, LayoutAnimation } from 'react-native';
import { HeaderView, ModifyHomeCard, ChildView, ListView } from '../components';
import MapView from 'react-native-maps';

class HomeWindow extends Component {

    state = {
        showChildrenView: false
    }

    componentDidUpdate() {
        LayoutAnimation.spring();
    }

    render() {
        const { contanier, mapView, headerView, listView } = styles;
        const { showChildrenView } = this.state;
        return (
            <View style={contanier}>
           
                <MapView style={mapView} />
                <View style={headerView}>
                    <HeaderView initMenu />
                </View>

                {showChildrenView && <ListView 
                    style={listView}
                    horizontal
                    data={[{}, {}]}
                    renderItem={() => <ChildView />}
                />}

                {!showChildrenView && <ModifyHomeCard confirmHomeAddressButtonPressed={() => this.setState({showChildrenView: true})} />}
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

export { HomeWindow };