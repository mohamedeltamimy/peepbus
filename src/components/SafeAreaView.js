import React, {Component} from 'react';
import { SafeAreaView } from 'react-navigation';

class SafeAreaViewClass extends Component {
    render() {
        const { children } = this.props;
        return <SafeAreaView>{children}</SafeAreaView>
    }
}

export { SafeAreaViewClass as SafeAreaView };