
import {
    Dimensions,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function ToolbarHeight() {
    const {
        width,
        height
    } = Dimensions.get('window');
    const iPhoneX = Platform.OS === "ios" && (height > 800 || width > 800) ? true : false;
    if (Platform.OS === "android") {
        return 56;
    }

    if (iPhoneX) {
        return 85;
    }

    if (Platform.OS === "ios") {
        return 64;
    }

}

const GetUser = async () => {
    const user = await AsyncStorage.getItem('user_token');
    return user;
}

const ShowMessage = (refs, title, message, type) => {
    refs.showMessage({
        message: title,
        description: message,
        type: type === "success" ? "success" : "danger",
        duration: 5000,
        floating: true
      });
}

const GetParentInfo = async () => {
    const info = await AsyncStorage.getItem('parentInfo');
    return info ? JSON.parse(info) : "";
}


export { ToolbarHeight, GetUser, ShowMessage, GetParentInfo } ;