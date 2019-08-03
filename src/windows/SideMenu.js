import React, {Component} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ListView, TextMedium, TextBold, SafeAreaView, ClickAbleView } from '../components'; 
import { L } from '../i18n';

class SideMenu extends Component {

    state = {
        data: [{
            image: require('../assets/start.png'),
            title: L['startTitle']
        },{
            image: require('../assets/children.png'),
            title: L['myChildrenTitle'],
            pageKey: "MyChildrenWindow"
        },{
            image: require('../assets/home.png'),
            title: L['setHomeLocationTitle'],
            pageKey: "SetHomeLocationWindow"
        },{
            image: require('../assets/profile.png'),
            title: L['profileTitle'],
            pageKey: 'ProfileWindow'
        },{
            image: require('../assets/logout.png'),
            title: L['logoutTitle']
        }]
    }

    renderItem(item) {
        const { itemContanier, itemImage, itemTitle } = styles;
        const { image, title, pageKey } = item.item;
        return (
            <ClickAbleView disabled={!pageKey} style={itemContanier} onPress={() => {
                const { push, toggleDrawer } = this.props.navigation;
                toggleDrawer();
                push(pageKey);
            }}>
                <Image style={itemImage} source={image} />
                <TextMedium style={itemTitle}>{title}</TextMedium>
            </ClickAbleView>
        )
    }

    listHeaderComponent() {
        const { headerView, userAvatarView, userAvatarImage, userNameText } = styles;
        return (
            <View style={headerView}>
                <View style={userAvatarView}>
                    <Image style={userAvatarImage} source={require('../assets/userAvatar.png')} />
                </View>
                <TextBold style={userNameText}>{'Mahmoud Elmoghazy'}</TextBold>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView>
                <ListView 
                    data={this.state.data}
                    listHeaderComponent={() => this.listHeaderComponent()}
                    renderItem={(item) => this.renderItem(item)}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    itemContanier: {
        marginLeft: 24,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        height: 20,
        width: 20
    }, 
    itemTitle: {
        marginLeft: 20,
        color: "#313131",
        fontSize: 16
    },
    headerView: {
        height: 101,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 24
    },
    userAvatarView: {
        height: 48,
        width: 48,
        borderRadius: 20,
        backgroundColor: "#C2D1E6",
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatarImage: {
        width: 24,
        height: 33
    },
    userNameText: {
        marginLeft: 16,
        color: "#313131",
        fontSize: 16
    }
});

export { SideMenu };