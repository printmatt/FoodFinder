import React, { useEffect, useState } from 'react'
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
import SavedRecipesScreen from './SavedRecipes';
import GroceryScreen from './GroceryScreen';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getDatabase, ref, child, get } from "firebase/database";
import LoadingScreen from './LoadingScreen';

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
            name='home-outline'
        />} />

        <BottomNavigationTab title='Random' icon={<Icon
            style={styles.icon}
            fill='#fff'
            name='bulb-outline'
        />} />
    </BottomNavigation>
);

const MainScreen = () => {

    return (
        <SafeAreaProvider>
            <StackNavigator.Navigator>
                <Screen
                    name="Login"
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

const MainAppScreen = ({ route }) => {
    const [userId, setuserId] = useState(route.params.userId)
    const [userInfo, setUserInfo] = useState(null)
    const dbRef = ref(getDatabase());
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    useEffect(() => {
        delay(2000).then(()=>get(child(dbRef, `users/${userId}`))).then((snapshot) => {
            if (snapshot.exists()) {
                setUserInfo(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [userId])
    
    if(!userInfo) return (<LoadingScreen></LoadingScreen>)
    return (
        <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='HomeStack' component={HomeStackScreen} initialParams={{userId : userId, userInfo: userInfo}} />
            <Screen name='RecipesStack' component={RecipesStackScreen} />
        </Navigator>
    )
}

const HomeStackScreen = ({route}) => {
    return (
        <StackNavigator.Navigator>
            <Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home', headerShown: false }}
                initialParams = {route.params}
            />
            <Screen name='Info'
                component={InfoScreen}
                options={{ title: 'Info', headerShown: false }}
            />
            <Screen name='SavedRecipes'
                component={SavedRecipesScreen}
                options={{ title: 'SavedRecipes', headerShown: false }}
            />
            <Screen name="Grocery" component={GroceryScreen}
                options={{ title: 'Grocery', headerShown: false }} />

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