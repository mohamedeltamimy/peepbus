import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

class SplashWindow extends Component {
    render() {
        const { contanier } = styles;
        return (
            <View style={contanier}></View>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    }
});

export { SplashWindow };