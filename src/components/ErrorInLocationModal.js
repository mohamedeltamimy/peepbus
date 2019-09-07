import React, { Component } from 'react'
import { Modal, View, Dimensions, Text } from 'react-native'
import { ClickAbleView } from './'
import Colors from '../Theme/Colors'

class ErrorInLocationModal extends Component {
  render () {
    const { mainView, shadowView, contentView, titleStyle, messageStyle, reloadButtonStyle, reloadTextStyle } = style
    const { closeModal, onPress } = this.props
    return (
      <Modal transparent onRequestClose={closeModal}>
        <View style={mainView}>
          <View style={shadowView} />
          <View style={contentView}>
            <Text style={titleStyle}>{'Error in location !'}</Text>
            <Text style={messageStyle}>{'Please open location access to let us access your location'}</Text>
            <ClickAbleView style={reloadButtonStyle} onPress={onPress}>
              <Text style={reloadTextStyle}>{'OPEN'}</Text>
            </ClickAbleView>
          </View>
        </View>
      </Modal>
    )
  }
}

const { width, height } = Dimensions.get('window')
const style = {
  mainView: {
    flex: 1,
    justifyContent: 'center'
  },
  shadowView: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.7
  },
  contentView: {
    backgroundColor: Colors.primary,
    width: 300,
    padding: 40,
    borderRadius: 5,
    elevation: 5,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center'
  },
  messageStyle: {
    fontSize: 16,
    color: '#848484',
    marginTop: 10,
    textAlign: 'center'
  },
  reloadButtonStyle: {
    backgroundColor: '#fff',
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center'
  },
  reloadTextStyle: {
    color: '#000000',
    fontSize: 18,
    alignSelf: 'center'
  }
}

export { ErrorInLocationModal }
