import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Text, TextBold, Icon } from './';
import { L } from '../i18n';
import { color } from '../../app.json';
import { ClickAbleView } from './ClickAbleView';

const StatusView = ({icon, text}) => {
    const { statusContanierView, statusIcon, stautsText } = styles;
    return (
        <View style={statusContanierView}>
            <Icon icon={icon} style={statusIcon} />
            <Text style={stautsText}>{text}</Text>
        </View>
    )
}

class ChildView extends Component {
    render() {
        const { contanier, childImageNameView, userAvatarView, userAvatarImage, userNameText, sepratorView, secondSeprator, driverView,
            driverAvatarImage, driverInfoView, driverText, busNumberView, busIcon, busNumberText, callButton, callImage } = styles;

        const { name } = this.props.item.item;
        return (
            <Card style={contanier}>
                <View style={childImageNameView}>
                    <View style={userAvatarView}>
                        <Image style={userAvatarImage} source={require('../assets/userAvatar.png')} />
                    </View>
                    <TextBold style={userNameText}>{name}</TextBold>
                </View>
                <StatusView icon={"ios-checkmark-circle-outline"} text={L['tripStartedText']} />
                <View style={sepratorView} />
                <View style={[sepratorView, secondSeprator]} />
                <View style={[sepratorView, secondSeprator]} />
                <StatusView icon={"md-bus"} text={L['busArrivedText']} />
                <View style={sepratorView} />
                <View style={[sepratorView, secondSeprator]} />
                <View style={[sepratorView, secondSeprator]} />
                <StatusView icon={"md-time"} text={L['tripEndedText']} />
                <View style={driverView}>
                    <View style={userAvatarView}>
                        <Image style={driverAvatarImage} source={{
                            uri: "https://secure.i.telegraph.co.uk/multimedia/archive/03497/Good_Samaratin_bus_3497986b.jpg"
                        }} />
                    </View>
                    <View style={driverInfoView}>
                        <TextBold style={driverText}>{'Mahmoud Mostafa'}</TextBold>
                        <View style={busNumberView}>
                            <Icon icon={"md-bus"} style={busIcon} />
                            <Text style={busNumberText}>{'145 FET'}</Text>
                        </View>
                    </View>
                    <ClickAbleView style={callButton}>
                        <Image style={callImage} source={require('../assets/callIcon.png')} />
                    </ClickAbleView>
                </View>
            </Card>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    contanier: {
        height: 295,
        width: 312,
        backgroundColor: "#ffffff",
        alignSelf: 'center',
        borderRadius: 8,
        elevation: 5,
        padding: 16,
        marginLeft: 10
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
    },
    childImageNameView: {
        alignItems: 'center',
        flexDirection: 'row'
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
    driverAvatarImage: {
        height: 48,
        width: 48,
        borderRadius: 20
    },
    userNameText: {
        marginLeft: 16,
        color: "#313131",
        fontSize: 20
    },
    statusContanierView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 60
    },
    statusIcon: {
        fontSize: 20,
        color: "#B9BFC9"
    },
    stautsText: {
        fontSize: 14,
        marginLeft: 8,
        color: "#B9BFC9"
    },
    sepratorView: {
        height: 3,
        width: 2,
        backgroundColor: "#B9BFC9",
        marginLeft: 66.5
    },
    secondSeprator: {
        marginTop: 3
    },
    driverView: {
        flexDirection: 'row',
        marginTop: 20
    },
    driverText: {
        color: "#313131",
        fontSize: 20
    },
    driverInfoView: {
        marginLeft: 19
    }, 
    busNumberView: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: 'center'
    }, 
    busIcon: {
        fontSize: 20,
        color: color
    }, 
    busNumberText: {
        color: "#313131",
        fontSize: 14,
        marginLeft: 8
    },
    callButton: {
        width: 38,
        height: 50,
        position: 'absolute',
        right: 0
    }, 
    callImage: {
        width: 38,
        height: 50
    }
});

export { ChildView };