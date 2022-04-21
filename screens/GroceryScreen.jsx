import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
import { Layout, TopNavigationAction, TopNavigation, List, ListItem, Divider } from '@ui-kitten/components';
import { Button, Icon, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const GroceryScreen = ({ route }) => {
    const [ingredients, setIngredients] = useState(route.params.grocery)
    useEffect(() => {
      
    }, [ingredients])
    
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
            status={ingredients[item].selected?"success":"primary"}
            onPress={() =>
                {   
                    if(ingredients[item].selected != undefined && ingredients[item].selected == true){
                        let newIngredients = {...ingredients}
                        newIngredients[item].selected = false;
                        setIngredients(newIngredients)
                    }
                    else{
                        let newIngredients = {...ingredients}
                        newIngredients[item].selected = true;
                        setIngredients(newIngredients)
                    }

                }
            }
        >CHECK</Button>
    );


    const renderItem = ({ item }) => {
        let des = ""
        for(const name in ingredients[item]){
            if(name == "selected") continue
            des += Number(ingredients[item][name]) + " " + name + "\r\n"
        }

        return <ListItem
            title={`${item}`}
            description={`${des}`}
            accessoryRight={props => renderItemAccessory(props, item)}>
        </ListItem>

    };

    return (
        <Layout style={styles.container}>
            <TopNavigation title='Grocery List' alignment='center' accessoryLeft={BackAction} />

            <List
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={Object.keys(ingredients)}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}

            />

        </Layout>
    );


};

export default GroceryScreen;

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