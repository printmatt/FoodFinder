import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icons } from '@ui-kitten/components';
import RecipesScreen from './RecipesScreen';
import IngredientsScreen from './IngredientsScreen';

const Tab = createMaterialBottomTabNavigator();
const RecipesSearchStack = createStackNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Home" activeColor="#fff">
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#FF6347',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            style={styles.icon}
                            fill='#8F9BB3'
                            name='home'
                        />),
                }}
            />
            <Tab.Screen
                name="Recipes"
                component={RecipesStackScreen}
                options={{
                    tabBarLabel: 'Recipes',
                    tabBarColor: '#FF6347',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            style={styles.icon}
                            fill='#8F9BB3'
                            name='bulb'
                        />),
                }}
            />

        </Tab.Navigator>
    )
}

const HomeScreen = () => {
    return (
        <RecipesSearchStack.Navigator>
            <RecipesSearchStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Welcome' }}
            />
        </RecipesSearchStack.Navigator>
    )
}

const RecipesStackScreen = () => {
    return (
        <RecipesSearchStack.Navigator>
            <RecipesSearchStack.Screen
                name="Recipes"
                component={RecipesScreen}
                options={{ title: 'Recipes' }}
            />
            <RecipesSearchStack.Screen
                name="Ingredients"
                component={IngredientsScreen}
                options={{ title: 'Ingredients' }}
            />
        </RecipesSearchStack.Navigator>
    )
}


export default MainScreen

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
});