/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {create} from 'zustand';  // Zustand is a state management system justr like redux
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware'; // persisit middleware eneables u to store state in a storage 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';


export const useStore = create(
    persist(
        (set, get) =>({
        CoffeeList: CoffeeData,
        BeanList: BeansData,
        CartProce:0,
        FavouriteList:[],
        CartList:[],
        OrderHistoryList:[],
    }),
    {
        name:'coffee-app',
        storage:createJSONStorage(()=> AsyncStorage),
    },),
);