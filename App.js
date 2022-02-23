

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import RecipesGenerator from './components/RecipesGenerator';
import RecipeInfo from './components/RecipeInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <RecipesGenerator ingredients={"chicken,rice"} navigation = {navigation}></RecipesGenerator>
  </ApplicationProvider>
);

const IngredientsScreen = ({navigation,route}) => (
  <ApplicationProvider {...eva} theme={eva.dark}>
    <RecipeInfo id = {route.params.id}></RecipeInfo>
  </ApplicationProvider>
);

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Ingredients"
          component={IngredientsScreen}
          options={{ title: 'Ingredients' }}
        />
    </Stack.Navigator>
  </NavigationContainer>
  
);
