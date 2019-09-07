import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from "mobx-react";

class SplashWindow extends Component {

    async init() {
        const isLogin = await this.props.user_token;

        if(isLogin) {
            const { replace } = this.props.navigation;
            replace('HomeWindow');
            return;
        }
        const { replace } = this.props.navigation;
        replace('LoginWindow');
    }

    render() {
        const { contanier } = styles;

        if(!this.props.fetching) {
            this.init();
        }

        return (
            <View style={contanier}></View>
        )
    }
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1
    }
});

const SplashWindowComponent = inject(stores => {
    return {
        user_token: stores.store.userStore.user_token,
        fetching: stores.store.userStore.fetching
    };
})(observer(SplashWindow));

export { SplashWindowComponent as SplashWindow };
