import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipeInfo from '../components/RecipeInfo';
import { Layout, Text, List, ListItem, Divider, Card, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import AddRecipe from '../components/AddRecipe';
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);



const IngredientsScreen = ({ route }) => {
    const navigation = useNavigation();
    
    const navigateBack = () => {
        navigation.goBack();
    };
    const addRecipe = ()=>{
        AddRecipe(route.params.id,route.params.title);
    }

    const BackAction = () => (
        <TopNavigationAction style={styles.header} icon={BackIcon} onPress={navigateBack} />
    );

    return (
        <Layout style={styles.container}>
            <TopNavigation title='Ingredients and Instructions' alignment='center' accessoryLeft={BackAction} />
            <Button onPress={addRecipe}>Add Recipe</Button>
            <RecipeInfo id={route.params.id}></RecipeInfo>
        </Layout>
    );
}

export default IngredientsScreen


const styles = StyleSheet.create({
    header: {
        marginTop: 75,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
    },
    a: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
});