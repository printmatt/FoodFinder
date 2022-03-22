import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import RecipesScreen from './RecipesScreen';
import InfoScreen from './InfoScreen';
import HomeScreen from './HomeScreen';
import IngredientsScreen from './IngredientsScreen';
import RandomRecipesScreen from './RandomRecipesScreen'
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const StackNavigator = createStackNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' icon={<Icon
            style={styles.icon}
            fill='#fff'
            name='home'
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
            <StackNavigator.Navigator>
            <Screen
                    name="LoginSignup"
                    component={LoginScreen}
                    options={{ title: 'Login', headerShown: false }}
                />
                <Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ title: 'SignUp', headerShown: false }}
                />
                <Screen
                    name="MainApp"
                    component={MainAppScreen}
                    options={{ title: 'MainApp', headerShown: false }}
                />
            </StackNavigator.Navigator>

        </SafeAreaProvider>


    )
}

const MainAppScreen = () => {

    return (
        <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='HomeStack' component={HomeStackScreen} />
            <Screen name='RecipesStack' component={RecipesStackScreen} />
        </Navigator>


    )
}
const HomeStackScreen = () => {
    return (
        <StackNavigator.Navigator>
            <Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home', headerShown: false }}
            />
            <Screen name='Info'
                component={InfoScreen}
                options={{ title: 'Info', headerShown: false }}
            />

            <Screen
                name="Recipes"
                component={RecipesScreen}
                options={{ title: 'Recipes', headerShown: false }}
            />
            <Screen
                name="Ingredients"
                component={IngredientsScreen}
                options={{ title: 'Ingredients', headerShown: false }}
            />

        </StackNavigator.Navigator>
    )
}


const RecipesStackScreen = () => {
    return (
        <StackNavigator.Navigator>
            <Screen
                name="RandomRecipes"
                component={RandomRecipesScreen}
                options={{ title: 'RandomRecipes', headerShown: false }}
            />
            <Screen
                name="Ingredients"
                component={IngredientsScreen}
                options={{ title: 'Ingredients', headerShown: false }}
            />
        </StackNavigator.Navigator>
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