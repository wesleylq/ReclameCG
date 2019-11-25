import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Map from './Map';
import ComplaintPanel from './ComplaintPanel';

const StackNavigator = createSwitchNavigator(
  {   
    Home: { screen: Map },
    ComplaintPanel: { screen: ComplaintPanel }
  }
);

export default createAppContainer(StackNavigator); 