import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderView, TextInput, Button, FooterView } from '../../components';
import { L } from '../../i18n';

class ForgetPasswordWindow extends Component {
    state = {}

    render() {
        const { contanier, contentView, emailTextInput, buttonContanier, sendButton } = styles;
        const { email } = this.state;
        return (
            <View style={contanier}>
                <HeaderView initBack title={L['forgetPasswordWindowTitle']} subtitle={L['forgetPasswordWindowSubTitle']} />
                <View style={contentView}>
                    <TextInput
                        style={emailTextInput}
                        label={L['emailPlaceHolder']}
                        value={email}
                        onChangeText={(email) => this.setState({email})} />
                    <Button 
                        style={sendButton}
                        title={L['sendActivationCodeButtonTitle']}
                        onPress={() => {
                            const { push } = this.props.navigation;
                            push('VerficationWindow');
                        }} />
                </View>
                <FooterView />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    contentView: {
        flex: 1,
        padding: 24
    },
    emailTextInput: {
        marginTop: 89
    },
    sendButton: {
        marginTop: 32
    },
});

export { ForgetPasswordWindow };