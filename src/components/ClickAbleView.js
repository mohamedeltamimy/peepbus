import {TouchableOpacity, TouchableNativeFeedback, Platform , View} from 'react-native';
import React from 'react';

const ClickAbleView = (props) => {
    if (Platform.OS === "android") {
        return (
            <TouchableNativeFeedback disabled={props.disabled} onPress={props.onPress} style={props.style}>
                <View style={props.style}>
                    {props.children}
                </View>
            </TouchableNativeFeedback>
        )
    } else {
        return (
            <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={props.style}>
                {props.children}
            </TouchableOpacity>
        )
    }
}

export {ClickAbleView};