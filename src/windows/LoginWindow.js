import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { TextBold, Text, SafeAreaView, TextInput, Button, Spinner } from '../components';
import { L } from '../i18n';
import { color } from '../../app.json';
import { ShowMessage } from '../lib';
import { inject, observer } from "mobx-react";
import FlashMessage from 'react-native-flash-message';

class LoginWindow extends Component {

    state = {}

    loginButtonPressed() {
        const { username, password } = this.state;
        if(!username) {
            this.setState({usernameError: true});
            return;
        }

        if(!password) {
            this.setState({passwordError: true});
            return;
        }

        this.setState({loading: true});
        
        this.props.login({
            username: username, 
            password: password
        }, {
            success: () => {
                this.setState({loading: false});
                const { replace } = this.props.navigation;
                replace('HomeWindow');
            },
            error: () => {
                ShowMessage(this.refs.flashMessage, L['loginErrorTitle'], L['loginErrorMessage'], 'error');
                this.setState({loading: false});
            }
        });
    }

    render() {
        const { contanier, introText, introSubText, usernameTextField, passwordTextField, buttonContanier, loginButton, blueImage, busIcon, forgetPasswordView, forgetPasswordButton } = styles;
        const { username, password, loading, usernameError, passwordError } = this.state;
        return (
            <SafeAreaView>
                <View style={contanier}>
                    <Image style={busIcon} resizeMode={'cover'} source={require('../assets/busIcon.png')} />
                    <Image style={blueImage} source={require('../assets/blueImage.png')} />
                    <View>

                        <TextBold style={introText}>{`${L['WelcomeToText']} School Name`}</TextBold>
                        <Text style={introSubText}>{L['signInToContinueText']}</Text>
                        <TextInput 
                            style={usernameTextField}
                            label={L['usernameText']}
                            errorMessage={L['usernameErrorMessage']}
                            value={username}
                            error={usernameError}
                            onChangeText={(username) => this.setState({username: username, usernameError: false})} />
                        <TextInput 
                            style={passwordTextField}
                            label={L['passwordText']}
                            errorMessage={L['passwordErrorMessage']}
                            value={password}
                            error={passwordError}
                            secureTextEntry
                            onChangeText={(password) => this.setState({password: password, passwordError: false})} />
                        
                        <Button 
                            contentStyle={buttonContanier}
                            style={loginButton}
                            title={L['signInButtonText']}
                            onPress={() => this.loginButtonPressed()} />

                        <View style={forgetPasswordView}>
                            <Button 
                                style={forgetPasswordButton}
                                mode={'text'}
                                color={"#B9BFC9"} 
                                uppercase={false}
                                title={L['forgetPasswordText']}
                                onPress={() => {
                                    const { push } = this.props.navigation;
                                    push('ForgetPasswordWindow');
                                }} />
                        </View>
                    </View>
                    {loading && <Spinner />}
                    <FlashMessage ref={'flashMessage'} />
                </View>
            </SafeAreaView>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        height: height,
        width: width,
        padding: 24
    },
    introText: {
        fontSize: 20,
        color: "#313131",
        marginTop: 24
    },
    introSubText: {
        color: "#A7A7A7",
        fontSize: 14,
        marginTop: 4
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
    },
    blueImage: {
        position: 'absolute',
        bottom: 50,
        height: height * 0.43,
        width: height * 0.20
    },
    busIcon: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        height: height * 0.30,
        width: width
    },
    forgetPasswordView: {
        marginTop: 32,
        width: width - 35
    },
    forgetPasswordButton: {
        position: 'absolute',
        right: 0,
        fontSize: 16
    }
});


const LoginWindowComponent = inject(stores => {
    return {
        login: stores.store.userStore.login,
        user_token : stores.store.userStore.user_token
    };
})(observer(LoginWindow));

export { LoginWindowComponent as LoginWindow };