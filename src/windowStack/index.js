import React, {Component} from 'react';
import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from 'react-navigation';
import {
    SplashWindow,
    HomeWindow,
    SideMenu,
    LoginWindow,
    ForgetPasswordWindow,
    VerficationWindow,
    ChangePasswordWindow,
    MyChildrenWindow,
    SetHomeLocationWindow,
    ProfileWindow,
    ChildProfileWindow
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

        await L.setLanguage(initLang);
        AsyncStorage.setItem('lang', initLang);

       const Drawer = createDrawerNavigator({
            HomeWindow
        }, {
            contentComponent: SideMenu,
            drawerPosition: isRTL() ? 'right' : 'left',
            drawerBackgroundColor: "#fff",
            drawerWidth: width - 50
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
            },
            LoginWindow: {
                screen: LoginWindow,
                navigationOptions: {
                    header: null
                }
            },
            ForgetPasswordWindow: {
                screen: ForgetPasswordWindow
            },
            VerficationWindow: {
                screen: VerficationWindow
            },
            ChangePasswordWindow: {
                screen: ChangePasswordWindow
            },
            MyChildrenWindow: {
                screen: MyChildrenWindow
            },
            SetHomeLocationWindow: {
                screen: SetHomeLocationWindow
            },
            ProfileWindow: {
                screen: ProfileWindow
            },
            ChildProfileWindow: {
                screen: ChildProfileWindow
            }
        }, {
            initialRouteName: "SplashWindow",
            defaultNavigationOptions: {
                header: null
            }
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