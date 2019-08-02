
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

export { ToolbarHeight } ;