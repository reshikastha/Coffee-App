import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';

const CartScreens = () => {
  const cartList = useStore((state: any) => state.CartList);

  console.log(cartList.length)
  return (
    <View>
      <Text>CartScreens</Text>
    </View>
  );
};

export default CartScreens;

const styles = StyleSheet.create({});
