import "react-native-gesture-handler";
import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from "mobx-react";
import Stores from './src/stores';
import WindowStack from './src/windowStack';

class App extends Component {

   render() {

        return (
            <Provider store={Stores}>
                <WindowStack />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => App);
