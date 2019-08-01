import React, {Component} from 'react';
import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';
import {
    SplashWindow
} from './screens';
import { Dimensions, View } from 'react-native';
import { L, isRTL } from '../i18n';
import AsyncStorage from '@react-native-community/async-storage';

class WindowStack extends Component {


    state = {
        WindowStack: <View />
    };

    async componentDidMount() {
        const lang = await AsyncStorage.getItem('lang');
        const initLang = lang || "en";

        await strings.setLanguage(initLang);
        AsyncStorage.setItem('lang', initLang);

       const Drawer = createDrawerNavigator({
            HomeWindow
        }, {
            contentComponent: SideMenu,
            drawerPosition: isRTL() ? 'right' : 'left',
            drawerBackgroundColor: "#fff",
            drawerWidth: width - 50,
            drawerType: 'back'
        });
        
        const MainWindowStack = createStackNavigator({
            SplashWindow: {
                screen: SplashWindow,
                navigationOptions: {
                    header: null
                }
            },
            HomeWindow: {
                screen: Drawer
            }
        }, {
            initialRouteName: "SplashWindow"
        });
    
        const AppContainer = createAppContainer(MainWindowStack);

        this.setState({
            WindowStack: <AppContainer />
        });
    }
    

    render() {
        return this.state.WindowStack
    }
}

// .. drawer menu 
const { width } = Dimensions.get('window');

export default WindowStack;