import React, {Component} from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { HeaderView, Button, FooterView, Text } from '../../components';
import { L } from '../../i18n';
import { fonts, color } from '../../../app.json';

class VerficationWindow extends Component {
    state = {}

    componentDidMount() {
        this.refs.digit1Input.focus();
    }

    digit1InputChanged(digits1) {
        this.setState({digits1});
        if(digits1.length === 1) {
            this.refs.digit2Input.focus();
        }
    }
    digit2InputChanged(digits2) {
        this.setState({digits2});
        if(digits2.length === 1) {
            this.refs.digit3Input.focus();
        }
    }
    digit3InputChanged(digits3) {
        this.setState({digits3});
        if(digits3.length === 1) {
            this.refs.digit4Input.focus();
        }
    }
    digit4InputChanged(digits4) {
        this.setState({digits4});

        const { push } = this.props.navigation;
        push('ChangePasswordWindow');
    }
    
    render() {
        const { contanier, contentView, write4DigitsNumberText, inputsView, digitsTextInput, resendCodeView } = styles;
        const { digits1, digits2, digits3, digits4 } = this.state;
        return (
            <View style={contanier}>
                <HeaderView initBack title={L['verficationCodeWindowTitle']} subtitle={L['verficationCodeWindowSubTitle']} />
                <View style={contentView}>
                   <Text style={write4DigitsNumberText}>{L['write4DigitsNumberText']}</Text>
                    <View style={inputsView}>
                        <TextInput
                            maxLength={1}
                            keyboardType={'number-pad'}
                            style={digitsTextInput}
                            value={digits1}
                            ref={'digit1Input'}
                            onChangeText={this.digit1InputChanged.bind(this)} />
                        <TextInput 
                            keyboardType={'number-pad'}
                            style={digitsTextInput}
                            maxLength={1}
                            value={digits2}
                            ref={'digit2Input'}
                            onChangeText={this.digit2InputChanged.bind(this)} />
                        <TextInput 
                            keyboardType={'number-pad'}
                            style={digitsTextInput}
                            maxLength={1}
                            value={digits3}
                            ref={'digit3Input'}
                            onChangeText={this.digit3InputChanged.bind(this)} />
                        <TextInput 
                            keyboardType={'number-pad'}
                            style={digitsTextInput}
                            maxLength={1}
                            ref={'digit4Input'}
                            value={digits4}
                            onChangeText={this.digit4InputChanged.bind(this)} />
                    </View>

                    <View style={resendCodeView}>
                        <Button
                            uppercase={false}
                            mode={'text'}
                            color={color} 
                            title={L["resendAcitivationMessageText"]} />
                    </View>
                </View>
                <FooterView />
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    contentView: {
        flex: 1,
        padding: 24
    },
    write4DigitsNumberText: {
        marginTop: 121,
        color: "#313131",
        fontSize: 18,
        fontFamily: fonts.medium
    },
    sendButton: {
        marginTop: 32
    },
    inputsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        height: width * 0.15
    },
    digitsTextInput: {
        height: width * 0.15,
        width: width * 0.19,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#B9BFC9",
        textAlign: 'center',
        fontSize: 18
    },
    resendCodeView: {
        marginTop: 32,
        alignItems: 'flex-end'
    }
});

export { VerficationWindow };