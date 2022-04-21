import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
import DeleteRecipe from '../components/DeleteRecipe';
import { Layout, TopNavigationAction, TopNavigation, List, ListItem, Divider } from '@ui-kitten/components';
import { Button, Icon, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const DeleteIcon = (props) => (
    <Icon {...props} name='trash' />
);



const SavedRecipesScreen = ({ route }) => {
    const [savedRecipes, setSavedRecipes] = useState(route.params.recipes);
    useEffect(() => {
      
    }, [savedRecipes])
    
    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    };



    const BackAction = () => (
        <TopNavigationAction style={styles.header} icon={BackIcon} onPress={navigateBack} />
    );

    const renderItemAccessory = (props, item) => (
        <Button
            size='tiny'
            onPress={() =>
                navigation.navigate('Ingredients', { id: `${item}`, title: `${savedRecipes[item]}` })
            }
        >SEE MORE</Button>
    );

    const renderDelete = (props, item) => (
        <Button
            size='tiny'
            accessoryLeft={DeleteIcon}
            status={'danger'}
            onPress={() => {
                    DeleteRecipe(item,savedRecipes[item])
                    var newRecipes = {...savedRecipes}
                    delete newRecipes[item]
                    console.log(newRecipes)
                    setSavedRecipes(newRecipes)
                }
            }
        ></Button>
    );


    const renderItem = ({ item }) => (
        <ListItem
            title={`${savedRecipes[item]}`}
            description={`${item}`}
            accessoryRight={props => renderItemAccessory(props, item)}
            accessoryLeft={props => renderDelete(props, item)}
        >
        </ListItem>

    );

    return (
        <Layout style={styles.container}>
            <TopNavigation title='Saved Recipes' alignment='center' accessoryLeft={BackAction} />

            <List
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={Object.keys(savedRecipes)}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}

            />

        </Layout>
    );

}
export default SavedRecipesScreen

const styles = StyleSheet.create({
    header: {
        paddingTop: 75,
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