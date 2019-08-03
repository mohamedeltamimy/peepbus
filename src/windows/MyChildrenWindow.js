import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { HeaderView, FooterView, TextBold, ListView, ClickAbleView } from '../components';
import { L } from '../i18n';
import { Card } from 'react-native-paper';

class MyChildrenWindow extends Component {

    renderItem() {
        const { itemContanier, itemContentView, userAvatarView, userAvatarImage, userNameText } = styles;
        return (
            <Card style={itemContanier}>
                <ClickAbleView style={itemContentView} onPress={() => {
                    const { push } = this.props.navigation;
                    push('ChildProfileWindow');
                }}>
                    <View style={userAvatarView}>
                        <Image style={userAvatarImage} source={require('../assets/userAvatar.png')} />
                    </View>
                    <TextBold style={userNameText}>{'Mahmoud Elmoghazy'}</TextBold>
                </ClickAbleView>
            </Card>
        )
    }

    render() {
        const { contanier } = styles;
        return (
            <View style={contanier}>
                <HeaderView title={L['myChildrenWindowTitle']} />
                <FooterView />

                <ListView 
                    data={[{}, {}, {}]}
                    renderItem={() => this.renderItem()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    itemContanier: {
        height: 98,
        marginLeft: 24,
        marginRight: 24,
        backgroundColor: "#ffffff",
        elevation: 4,
        marginTop: 24,
        borderRadius: 8
    },
    itemContentView: {
        height: 98,
        alignItems: 'center',
        flexDirection: 'row'
    },
    userAvatarView: {
        height: 48,
        width: 48,
        borderRadius: 20,
        backgroundColor: "#C2D1E6",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16
    },
    userAvatarImage: {
        width: 24,
        height: 33
    },
    userNameText: {
        marginLeft: 13,
        color: "#313131",
        fontSize: 20
    }
});

export { MyChildrenWindow };