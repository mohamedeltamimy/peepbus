import React, {Component} from 'react';
import LoadingSpinner from 'react-native-spinkit';
import { StyleSheet, View, Dimensions, Modal } from 'react-native';
import { TextBold } from './';
import { color } from '../../app.json';
import { L } from '../i18n';

class Spinner extends Component {

    render() {
        const { contanier, shadowView, loadinText } = styles;
        return (
            <Modal transparent>
                <View style={contanier}>
                    <View style={shadowView} />
                    <TextBold ignoreRTL style={loadinText}>{L['loadingMessage']}</TextBold>
                    <LoadingSpinner isVisible size={50} type={"Wave"} color={"#ffffff"}/>
                </View>
            </Modal>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        position: 'absolute',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadowView: {
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: color,
        opacity: 0.7
    },
    loadinText: {
        color: "#ffffff",
        fontSize: 18
    }
});

export { Spinner };