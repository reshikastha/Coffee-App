/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import { useStore } from '../store/store';
import { COLORS } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailsScreen = ({navigation, route}: any) => {
  const ItemofIndex = useStore((state: any) =>
  route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHandler = () =>{
    navigation.pop();
  };

  const addToFavouriteList = useStore((state : any) => state.addToFavoriteList);
  const deleteFromFavouriteList = useStore((state : any) => state.deleteFromFavoriteList);

  const ToggleFavourite = (favourite: boolean, type: string, id:string) =>{
    favourite ? deleteFromFavouriteList(type, id) : addToFavouriteList(type, id);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler ={true}
          imagelink_portrait= {ItemofIndex.imagelink_portrait}
          type ={ItemofIndex.type}
          id ={ItemofIndex.id}
          favourite ={ItemofIndex.favourite}
          name ={ItemofIndex.name}
          special_ingredient ={ItemofIndex.special_ingredient}
          ingredients ={ItemofIndex.ingredients}
          average_rating ={ItemofIndex.average_rating}
          ratings_count ={ItemofIndex.ratings_count}
          roasted ={ItemofIndex.roasted}
          BackHandler ={BackHandler}
          ToggleFavourite ={ToggleFavourite}
        />

      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
  },
});
