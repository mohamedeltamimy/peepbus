import React, { Component } from 'react'
import { View, Dimensions, ActivityIndicator } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'
import { ClickAbleView } from './'
import { color } from '../../app.json';

class TextMatrialInput extends Component {
  render () {
    const { style, label, value, onChangeText, secureTextEntry, isSelection, onPress, loading, error, errorMessage } = this.props;
    const { defaultStyle, clickAbleView, loadingStyle } = styles;
    return (
      <View style={[defaultStyle, style]}>
        <TextInput
         style={[styles.defaultStyle]}
          label={label}
          mode={'outlined'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          underlineColor={'#ffffff'}
          error={error}
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
        {error && <HelperText type="error" style={{
          color: 'red'
        }}>{errorMessage || 'Error message goes here !'}</HelperText>}
        {loading && <ActivityIndicator animating style={loadingStyle} />}
        {isSelection && <ClickAbleView disabled={loading} style={clickAbleView} onPress={onPress} />}
      </View>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = {
  defaultStyle: {
    justifyContent: 'center',
    height: 60
  },
  textInput: {
    height: 57
  },
  clickAbleView: {
    height: 57,
    position: 'absolute',
    width: width - 20
  },
  loadingStyle: {
    position: 'absolute',
    right: 0
  }
}

export { TextMatrialInput as TextInput }
