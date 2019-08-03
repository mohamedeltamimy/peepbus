import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { Text, TextBold, Button } from './';
import { L } from '../i18n';

class ModifyHomeCard extends Component {
    render() {
        const { contanier, headerText, headerSubText, editHomeLocationButton, yesThishomeLocationButton } = styles;
        const { confirmHomeAddressButtonPressed } = this.props;
        return (
            <Card style={contanier}>
                <TextBold style={headerText}>{L['isThisTheHomeLocationText']}</TextBold>
                <Text style={headerSubText}>{L['isThisTheHomeLocationSubText']}</Text>
                <Button
                    uppercase={false} 
                    style={editHomeLocationButton}
                    title={L['editHomeLocationButtonTitle']} />
                <Button 
                    uppercase={false} 
                    mode={'text'}
                    color={"#313131"}
                    style={yesThishomeLocationButton}
                    title={L['yesThishomeLocationButtonTitle']}
                    onPress={confirmHomeAddressButtonPressed} />
            </Card>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        position: 'absolute',
        height: 249,
        width: width - 40,
        backgroundColor: "#ffffff",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: 8,
        elevation: 5,
        padding: 24
    },
    headerText: {
        fontSize: 20,
        color: "#313131"
    }, 
    headerSubText: {
        color: "#313131",
        fontSize: 14,
        marginTop: 12
    },
    yesThishomeLocationButton: {
        marginTop: 10
    },
    editHomeLocationButton: {
        marginTop: 24
    }
});

export { ModifyHomeCard };