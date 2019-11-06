import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Map from './Map'

const StackNavigator = createSwitchNavigator(
    {   
        Home: { screen: Map }  
   
    }
);

export default createAppContainer(StackNavigator); 