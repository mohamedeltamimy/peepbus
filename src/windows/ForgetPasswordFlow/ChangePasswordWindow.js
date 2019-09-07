import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, HeaderView, FooterView, Spinner } from '../../components';
import { L } from '../../i18n';
import { color } from '../../../app.json';
import { NavigationActions, StackActions } from "react-navigation";
import { ChangePassword } from '../../models';
import FlashMessage from 'react-native-flash-message';

class ChangePasswordWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            normalChangePassword: props.navigation.getParam('normalChangePassword')
        }
    }

    changePasswordPressed() {
        const { normalChangePassword, oldPassword, password, confirmPassword } = this.state;
        if(!oldPassword) {
            this.setState({oldPasswordError: true});
            return;
        }
        if(!password) {
            this.setState({newPasswordError: true});
            return;
        }
        if(confirmPassword !== password) {
            this.setState({rePasswordError: true});
            return;
        }

        this.setState({loading: true});

        ChangePassword({
            current: oldPassword,
            password: password,
            password_confirmation: confirmPassword
        }, {
            success: (result) => {
                this.setState({
                    oldPassword: "",
                    password: "",
                    confirmPassword: "",
                    loading: false
                });

                this.showMessage('Success', "Password updated successfully" , 'success');
            },
            error: (error, errorResponse) => {
                this.setState({
                    loading: false
                });

                const errors = errorResponse.data.error;
                let errorMessage = "";

                if(Array.isArray(errors)){
                    for(let key in errors) {
                        for (let x = 0; x < errors[key].length; x+= 1){
                            errorMessage += `${errors[key][x]} \n`;
                        }
                    }
                } else { 
                    errorMessage= errors.message;
                }

                this.showMessage('Opps !', errorMessage, 'error');

                
            }
        });
        // let resetActionParams = {
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: "LoginWindow" })
        //     ]
        // };

        // const resetAction = StackActions.reset(resetActionParams);
        
        // const { dispatch } = this.props.navigation;
        // dispatch(resetAction);
    }

    showMessage(title, message, type) {
        this.refs.flashMessage.showMessage({
            message: title,
            description: message,
            type: type === "success" ? "success" : "danger",
            duration: 5000,
            floating: true
          });
    }

    render() {
        const { contanier, contentView, usernameTextField, passwordTextField, buttonContanier, loginButton } = styles;
        const { oldPassword, password, confirmPassword, normalChangePassword, oldPasswordError, newPasswordError, rePasswordError, loading } = this.state;
        return (
            <View style={contanier}>
                <HeaderView title={L['chnagePasswordWindowTitle']} subtitle={!normalChangePassword  && L['chnagePasswordWindowSubTitle']} />
                <FooterView />
                <View style={contentView}>
                    {normalChangePassword && <TextInput 
                        style={usernameTextField}
                        label={L['oldPasswordPlaceHolder']}
                        value={oldPassword}
                        error={oldPasswordError}
                        errorMessage={L['enterOldPasswordErrorMessage']}
                        secureTextEntry
                        onChangeText={(oldPassword) => this.setState({oldPassword, oldPasswordError: false})} />}
                    <TextInput 
                        style={usernameTextField}
                        label={L['newPasswordPlaceHolder']}
                        value={password}
                        secureTextEntry
                        error={newPasswordError}
                        errorMessage={L['enterNewPasswordErrorMessage']}
                        onChangeText={(password) => this.setState({password, newPasswordError: false})} />
                    <TextInput 
                        style={passwordTextField}
                        label={L['rePasswordPlaceHolder']}
                        value={confirmPassword}
                        errorMessage={L['enterPasswordNotTheSameErrorMessage']}
                        error={rePasswordError}
                        secureTextEntry
                        onChangeText={(confirmPassword) => this.setState({confirmPassword, rePasswordError: false})} />
                    
                    <Button 
                        uppercase={false}
                        contentStyle={buttonContanier}
                        style={loginButton}
                        title={L['changePasswordButtonTitle']}
                        onPress={() => this.changePasswordPressed()} />
                </View>

                <FlashMessage position="top" ref={"flashMessage"} />
                {loading && <Spinner />}
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