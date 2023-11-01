/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require('../assets/app_images/HarryPotter.jpg')}
        style={styles.Image}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: 50,
    width: 50,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: 50,
    width: 50,
  },
});

export default ProfilePic;