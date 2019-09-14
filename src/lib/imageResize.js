const {
    NativeModules,
    Platform
} = require('react-native');
const {
    ImageResizerAndroid,
} = NativeModules;


export function createResizedImage(imagePath, newWidth, newHeight, compressFormat, quality, rotation = 0, outputPath) {

    if (Platform.OS === "android") {
        let $ = new Promise((resolve, reject) => {
            ImageResizerAndroid.createResizedImage(imagePath, newWidth, newHeight,
                compressFormat, quality, rotation, outputPath, resolve, reject);
        });

        return $;
    } else {
        return new Promise((resolve, reject) => {
            NativeModules.ImageResizer.createResizedImage(imagePath, newWidth, newHeight, compressFormat, quality, rotation, outputPath, (err, response) => {
              if (err) {
                return reject(err);
              }
      
              resolve(response);
            });
          });
    }
};