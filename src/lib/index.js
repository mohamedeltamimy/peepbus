
import {
    Dimensions,
    Platform
} from 'react-native';

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

const GetUser = () => {

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


export { ToolbarHeight, GetUser, ShowMessage } ;