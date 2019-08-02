import React from 'react';
import { Button } from 'react-native-paper';
import { color } from '../../app.json';

const CustomButton = ({title, onPress, contentStyle, style, mode, color, uppercase}) => (
  <Button color={color} theme={{
      fonts: {
        regular: "Roboto-Regular",
        medium: "Roboto-Regular"
    }
  }} uppercase={uppercase} contentStyle={[(mode !== "text" && styles.contentStyle), contentStyle]} style={style} mode={mode || "contained"} onPress={onPress}>{title}</Button>
);

const styles = {
  contentStyle: {
    height: 48,
    backgroundColor: color
  }
}

export {CustomButton as Button};