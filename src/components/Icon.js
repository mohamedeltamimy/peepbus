import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = ({color, icon, size , style , onPress , isDisable}) => {

  return (<IonIcons disabled={true} name={icon} size={size} color={color} style={style} />);

};

const MaterialIcon = ({color, icon, size, style}) => {
  return (<MaterialIcons disabled ={true} name={icon} size={size} color={color} style={style} />);
}

export {Icon, MaterialIcon};
