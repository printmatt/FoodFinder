

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import RecipesGenerator from './components/RecipesGenerator';
import RecipeInfo from './components/RecipeInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <MainScreen></MainScreen>
    </ApplicationProvider>
  </NavigationContainer>

);
