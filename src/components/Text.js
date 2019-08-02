import React, {Component} from 'react';
import { Text, StyleSheet } from 'react-native';

class CustomText extends Component {
    render() {
        const { children, style, numberOfLines } = this.props;
        return <Text style={[styles.contanier, style]} numberOfLines={numberOfLines}>{children}</Text>
    }
}

const styles = StyleSheet.create({
    contanier: {
        fontFamily: "Roboto-Regular"
    }
});

export { CustomText as Text };