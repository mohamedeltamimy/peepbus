import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

class FooterView extends Component {
    render() {
        const { contanier, busIcon, blueImage } = styles;
        const { image } = this.props;
        return (
            <View style={contanier}>
                <Image style={busIcon} resizeMode={'cover'} source={require('../assets/busIcon.png')} />
                <Image style={blueImage} source={image || require('../assets/blueImage.png')} />
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        position: 'absolute',
        width: width,
        bottom: 0
    },
    blueImage: {
        position: 'absolute',
        bottom: 0,
        height: height * 0.43,
        width: height * 0.20
    },
    busIcon: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        height: height * 0.30,
        width: width
    },
});

export { FooterView };