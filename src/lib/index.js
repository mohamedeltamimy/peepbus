
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

// .. picker
function PickImage(callback) {
    const ImagePicker = require('react-native-image-picker');
    const options = {
        title: "Pick photo",
        cancelButtonTitle: 'cancel',
        takePhotoButtonTitle:  'Take new photo',
        chooseFromLibraryButtonTitle: 'Pick photo from gallery',
        mediaType: "images",
        quality: 1,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
        if (response.uri) {
            resizeImage(response.uri, callback);
        }
    });
}

// .. resize Image
function resizeImage(_image, callback) {
    const createResizedImage = require('./imageResize').createResizedImage;
    createResizedImage(_image, 500, 500, 'JPEG', 80).then((source) => {
        callback(source);

    }).catch((err) => {
        console.log(err);
        return alert('Unable to resize the photo', 'Check the console for full the error message');
    });
}

export { ToolbarHeight, GetUser, ShowMessage, GetParentInfo, PickImage } ;