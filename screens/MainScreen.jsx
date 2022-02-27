import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import RecipesScreen from './RecipesScreen';
import InfoScreen from './InfoScreen';
import HomeScreen from './HomeScreen';
import IngredientsScreen from './IngredientsScreen';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const RecipesSearchStack = createStackNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' icon={<Icon
            style={styles.icon}
            fill='#fff'
            name='home'
        />} />
        <BottomNavigationTab title='Profile' icon={<Icon
            style={styles.icon}
            fill='#fff'
            name='person'
        />} />
        <BottomNavigationTab title='Recipes' icon={<Icon
            style={styles.icon}
            fill='#fff'
            name='bulb'
        />} />
    </BottomNavigation>
);

const MainScreen = () => {

    return (
        <SafeAreaProvider>
            <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
                <Screen name='HomeStack' component={HomeStackScreen} />
                <Screen name='InfoStack' component={InfoStackScreen} />
                <Screen name='RecipesStack' component={RecipesStackScreen} />
            </Navigator>
        </SafeAreaProvider>


    )
}

const HomeStackScreen = () => {
    return (
        <RecipesSearchStack.Navigator>
            <Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home', headerShown: false }}
            />
            <Screen
                name="Recipes"
                component={RecipesScreen}
                options={{ title: 'Recipes', headerShown: false }}
            />
            <Screen
                name="Ingredients"
                component={IngredientsScreen}
                options={{ title: 'Ingredients', headerShown: false  }}
            />
        </RecipesSearchStack.Navigator>
    )
}

const InfoStackScreen = () => {
    return (
        <RecipesSearchStack.Navigator>
            <Screen
                name="Info"
                component={InfoScreen}
                options={{ title: 'Info', headerShown: false }}
            />
            
        </RecipesSearchStack.Navigator>
    )
}

const RecipesStackScreen = () => {
    return (
        <RecipesSearchStack.Navigator>
            <Screen
                name="Recipes"
                component={RecipesScreen}
                options={{ title: 'Recipes', headerShown: false }}
            />
            <Screen
                name="Ingredients"
                component={IngredientsScreen}
                options={{ title: 'Ingredients', headerShown: false  }}
            />
        </RecipesSearchStack.Navigator>
    )
}


export default MainScreen

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
        marginTop: -2
    },
    label: {
        marginTop: 5
    }
});