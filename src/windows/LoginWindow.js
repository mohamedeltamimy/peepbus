import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { TextBold, Text, SafeAreaView, TextInput, Button } from '../components';
import { L } from '../i18n';
import { color } from '../../app.json';


class LoginWindow extends Component {

    state = {}

    render() {
        const { contanier, introText, introSubText, usernameTextField, passwordTextField, buttonContanier, loginButton, blueImage, busIcon, forgetPasswordView, forgetPasswordButton } = styles;
        const { username, password } = this.state;
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
                            value={username}
                            onChangeText={(username) => this.setState({username})} />
                        <TextInput 
                            style={passwordTextField}
                            label={L['passwordText']}
                            value={password}
                            secureTextEntry
                            onChangeText={(password) => this.setState({password})} />
                        
                        <Button 
                            contentStyle={buttonContanier}
                            style={loginButton}
                            title={L['signInButtonText']} />

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

export { LoginWindow };