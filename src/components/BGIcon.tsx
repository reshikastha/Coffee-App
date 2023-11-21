import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, SPACING} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}
const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <Ionicons name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_28,
    width: SPACING.space_28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
