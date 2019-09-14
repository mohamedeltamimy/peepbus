import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { PickImage } from '../lib';
import { L } from '../i18n';
import { HeaderView, FooterView, TextBold, ClickAbleView, Text, Spinner } from '../components';
import { inject, observer } from "mobx-react";

class ProfileWindow extends Component {

    state = {
        userImage: require('../assets/userAvatar.png')
    }

    render() {
        const { contanier, cardContanier, userNameText, userImageView, userImageCard, userAvatarImage, editIconCard, editIconView, editIcon, editPasswordView, lockIcon, passwordText, editPasswordIcon } = styles;
        const { full_name } = this.props.user;
        return (
            <View style={contanier}>
                <HeaderView title={L['myProfileWindowTitle']} />
                <FooterView />
                <Card style={cardContanier}>
                    <TextBold style={userNameText}>{full_name}</TextBold>
                
                    <ClickAbleView style={editPasswordView} onPress={() => {
                        const { push } = this.props.navigation;
                        push('ChangePasswordWindow', {
                            normalChangePassword: true
                        });
                    }}>
                        <Image source={require('../assets/lockIcon.png')} style={lockIcon} />
                        <Text style={passwordText}>{L['passwordText']}</Text>
                        <Image style={[editIcon, editPasswordIcon]} source={require('../assets/editIcon.png')} />
                    </ClickAbleView>
                </Card>
                <View style={userImageCard}>
                    <ClickAbleView style={userImageView} onPress={() => {
                        PickImage((image) => {
                            this.setState({
                                userImage: {
                                    uri: image.uri
                                }
                            })

                            const formData = new FormData();
                            formData.append('image', {
                                uri: image.uri,
                                name: 'image.jpg',
                                type: 'multipart/form-data'
                            })
                            this.props.updateUserProfileImage(formData, {
                                success: (result) => {
                                    console.log(result);
                                },
                                error: () => {}
                            });

                        })
                    }}>
                        <Image style={userAvatarImage} source={this.state.userImage} />
                    </ClickAbleView>
                    <Card style={editIconCard}>
                        <View style={editIconView}>
                            <Image style={editIcon} source={require('../assets/editIcon.png')} />
                        </View>
                    </Card>
                </View>
                {/* <Spinner /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    cardContanier: {
        height: 230,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: "#ffffff",
        elevation: 3,
        marginTop: 30,
        borderRadius: 10
    },
    userNameText: {
        color: "#313131",
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 104
    },
    userImageCard: {
        height: 100,
        width: 100,
        position: 'absolute',
        top: 110,
        alignSelf: 'center',
    },
    userImageView: {
        borderRadius: 20,
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C2D1E6'
    },
    userAvatarImage: {
        width: 51,
        height: 70
    },
    editIconCard: {
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        position: 'absolute',
        bottom: 10,
        right: 0,
        elevation: 3,
    },
    editIconView: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editIcon: {
        height: 20,
        width: 20
    },
    editPasswordView: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lockIcon: {
        marginLeft: 15,
        height: 21,
        width: 20
    },
    passwordText: {
        marginLeft: 11,
        fontSize: 14
    },
    editPasswordIcon: {
        position: 'absolute',
        right: 15
    }
});

const ProfileWindowComponent = inject(stores => {
    return {
        user: stores.store.userStore.user,
        updateUserProfileImage: stores.store.userStore.updateUserProfileImage
    };
})(observer(ProfileWindow));

export { ProfileWindowComponent as ProfileWindow };