import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, HeaderView, FooterView } from '../../components';
import { L } from '../../i18n';
import { color } from '../../../app.json';


class ChangePasswordWindow extends Component {

    state = {}

    render() {
        const { contanier, contentView, usernameTextField, passwordTextField, buttonContanier, loginButton } = styles;
        const { password, confirmPassword } = this.state;
        return (
            <View style={contanier}>
                <HeaderView title={L['chnagePasswordWindowTitle']} subtitle={L['chnagePasswordWindowSubTitle']} />
                <FooterView />
                <View style={contentView}>
                    <TextInput 
                        style={usernameTextField}
                        label={L['newPasswordPlaceHolder']}
                        value={password}
                        secureTextEntry
                        onChangeText={(password) => this.setState({password})} />
                    <TextInput 
                        style={passwordTextField}
                        label={L['rePasswordPlaceHolder']}
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})} />
                    
                    <Button 
                        uppercase={false}
                        contentStyle={buttonContanier}
                        style={loginButton}
                        title={L['changePasswordButtonTitle']} />
                </View>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        height: height,
        width: width
    },
    contentView: {
        padding: 24
    },
    textInputStyle: {
        height: 57
    },
    usernameTextField: {
        marginTop: 30
    },
    passwordTextField: {
        marginTop: 32
    },
    buttonContanier: {
        height: 48,
        backgroundColor: color
    },
    loginButton: {
        marginTop: 32
    }
});

export { ChangePasswordWindow };