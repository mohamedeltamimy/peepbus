import React, {Component} from 'react';
import { TextInput } from 'react-native-paper';
import { color } from '../../app.json';

class TextMatrialInput extends Component {
    render() {
        const { style, label, value, onChangeText, secureTextEntry } = this.props;
        return (
            <TextInput 
                style={[styles.defaultStyle, style]}
                mode={'outlined'}
                label={label}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                theme={{
                    roundness: 6,
                    colors: {
                        primary: color,
                        error: "red",
                        text: "#000000",
                        background: '#ffffff',
                        accent: 'red'
                    },
                    fonts: {
                        regular: "Roboto-Regular"
                    }
                }}
            />
        )
    }
}

const styles = {
    defaultStyle: {
        height: 57
    }
}


export { TextMatrialInput as TextInput };