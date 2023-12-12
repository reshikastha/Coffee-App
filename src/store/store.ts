/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

/* eslint-disable eqeqeq */

import {create} from 'zustand'; // Zustand is a state management system justr like redux
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware'; // persisit middleware eneables u to store state in a storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavouriteList: [],
      CartList: [],
      OrderHistoryList: [],
      //this will return a set function so set
      // we r going to update multiple layer so produce method
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;

            //first we have to check where there is any item in cartList or not
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                //Logic exit if item is already present
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  // i is for cartList and j is for prices
                  if (state.CartList[i].prices[j].size == cartItem.prices[0]) {
                    // logic exit if the added cart size is already there
                    size = true;
                    state.CartList[i].prices[j].quantity++; //updating the state and increasing the quantity and the break the loop
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]); // adding the new item in card
                } // new to the cart item
                // sorted the item baseon the size or quantity
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            //what if the item doesn't exit in the cart
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      //calcuate the cart price do new function
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            //update that totalprice to the cart price
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),
      //adding the item to their favorite list
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            //check if type is coffee or beans
            if (type == 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                // we have to update the coffeelist from state
                if (state.CoffeeList[i].id == id) {
                  if (state.CoffeeList[i].favourite == false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavouriteList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type == 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                // we have to update the BeanList from state
                if (state.BeanList[i].id == id) {
                  if (state.BeanList[i].favourite == false) {
                    state.BeanList[i].favourite = true;
                    state.FavouriteList.unshift(state.BeanList[i]);
                  }
                  break;
                }
              }
            }
          }),
        ),
      //delete the item to their favorite list
      deleteFromFavoriteList: (type: string, id: string) =>
        set(produce(state => {
            if (type == 'Coffee') {
                for (let i = 0; i < state.CoffeeList.length; i++) {

                    if (state.CoffeeList[i].id == id) {
                      if (state.CoffeeList[i].favourite == true) { // if the state is true then only we r removing
                        state.CoffeeList[i].favourite = false;
                      }
                      break;
                    }
                  }
            } else if (type == 'Bean') {
                for (let i = 0; i < state.BeanList.length; i++) {

                  if (state.BeanList[i].id == id) {
                    if (state.BeanList[i].favourite == true) {
                      state.BeanList[i].favourite = false;
                    }
                    break;
                  }
                }
              }
              let spliceIndex = -1;
              for (let i = 0; i < state.FavouriteList.length; i++){ // checking id
                if (state.FavouriteList[i].id == id) {
                    spliceIndex = i;
                    break;
              }
            }
            state.FavouriteList.splice(spliceIndex, 1); // mention the spliceIndex and we have to remove one item so 1

        })),
        incrementCartItemQuantity:(id:string, size: string) =>
          set(
            produce(state =>{
              for (let i = 0; i < state.CartList.length; i++) {
                if (state.CartList[i].id == id) {
                  //Logic exit if item is already present
                  for (let j = 0; j < state.CartList[i].prices.length; j++) {
                    // i is for cartList and j is for prices
                    if (state.CartList[i].prices[j].size == size) {
                      // logic exit if the added cart size is already there

                      state.CartList[i].prices[j].quantity++; //updating the state and increasing the quantity and the break the loop
                      break;
                    }
                  }
                }
              }
            })
          ),
          decrementCartItemQuantity: (id: string, size: string) =>
            set(
              produce(state => {
                for (let i = 0; i < state.CartList.length; i++) {
                  if (state.CartList[i].id == id) {
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                      if (state.CartList[i].prices[j].size == size) {
                        if (state.CartList[i].prices.length > 1) {
                          if (state.CartList[i].prices[j].quantity > 1) {
                            state.CartList[i].prices[j].quantity--;
                          } else {
                            state.CartList[i].prices.splice(j, 1);
                          }
                        } else {
                          if (state.CartList[i].prices[j].quantity > 1) {
                            state.CartList[i].prices[j].quantity--;
                          } else {
                            state.CartList.splice(i, 1);
                          }
                        }
                        break;
                      }
                    }
                  }
                }
              }),
            ),


    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
