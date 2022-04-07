import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
import { Layout, TopNavigationAction, TopNavigation, List, ListItem } from '@ui-kitten/components';
import { Button, Icon, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const SavedRecipesScreen = ({ route }) => {
    const savedRecipes = route.params.recipes;
    console.log("Saved")
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


    const renderItem = ({ item }) => (
        <ListItem
            title={`${savedRecipes[item]}`}
            description={`${item}`}
            accessoryRight={props => renderItemAccessory(props, item)}
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