import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import RecipesScreen from './RecipesScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import IngredientsScreen from './IngredientsScreen';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const RecipesSearchStack = createStackNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Home' icon = {<Icon
                            style={styles.icon}
                            fill='#fff'
                            name='home'
                        />} />
        <BottomNavigationTab title='Profile' icon ={<Icon
                            style={styles.icon}
                            fill='#fff'
                            name='person'
                        />} />
        <BottomNavigationTab title='Recipes' icon ={<Icon
                            style={styles.icon}
                            fill='#fff'
                            name='bulb'
                        />}/>
    </BottomNavigation>
);

const MainScreen = () => {

    return (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='Home' component={HomeStackScreen} />
            <Screen name='Profile' component={ProfileStackScreen} />
            <Screen name='Recipes' component={RecipesStackScreen} />
        </Navigator>
        // <Tab.Navigator initialRouteName="HomeStack" activeColor="#fff"
        // screenOptions={({ route }) => ({
        //     tabBarActiveTintColor: "#f5610a",
        //     tabBarInactiveTintColor: "#555",
        //     tabBarLabelStyle: {
        //       fontSize: 10,
        //       marginTop: 5
        //     },
        //   })}>
        //     <Tab.Screen
        //         name="HomeStack"
        //         component={HomeStackScreen}
        //         options={{
        //             tabBarLabel: 'Home',
        //             tabBarColor: '#FF6347',
        //             tabBarIcon: ({ color }) => (
                        // <Icon
                        //     style={styles.icon}
                        //     fill='#fff'
                        //     name='home'
                        // />),
        //         }}
        //     />
        //     <Tab.Screen
        //         name="ProfileStack"
        //         component={ProfileStackScreen}
        //         options={{
        //             tabBarLabel: 'Profile',
        //             tabBarColor: '#FF6347',
        //             tabBarIcon: ({ color }) => (
        //                 <Icon
        //                     style={styles.icon}
        //                     fill='#fff'
        //                     name='person'
        //                 />),
        //         }}
        //     />
        //     <Tab.Screen
        //         name="RecipesStack"
        //         component={RecipesStackScreen}
        //         options={{
        //             tabBarLabel: 'Recipes',
        //             tabBarColor: '#FF6347',
        //             tabBarIcon: ({ color }) => (
        //                 <Icon
        //                     style={styles.icon}
        //                     fill='#fff'
        //                     name='bulb'
        //                 />),

        //         }}
        //     />

        // </Tab.Navigator>
    )
}

const HomeStackScreen = () => {
    return (
        <RecipesSearchStack.Navigator options={{}}>
            <RecipesSearchStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home', headerShown: false}}
            />
        </RecipesSearchStack.Navigator>
    )
}

const ProfileStackScreen = () => {
    return (
        <RecipesSearchStack.Navigator>
            <RecipesSearchStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile', headerShown: false }}
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
                options={{ title: 'Recipes', headerShown: false }}
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
        width: 26,
        height: 26,
        marginTop: -2
    },
    label: {
        marginTop: 5
    }
});