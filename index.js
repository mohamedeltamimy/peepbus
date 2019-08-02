/**
 * @format
 */

import "react-native-gesture-handler";
import {AppRegistry} from 'react-native';
import WindowStack from './src/windowStack';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => WindowStack);
