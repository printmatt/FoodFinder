import React, { useEffect, useState } from 'react';
import {Layout, Text, List, ListItem, Divider, Card } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import RecipeInfo from './RecipeInfo';
import { StyleSheet, View, Image } from 'react-native';

const RecipesGenerator = ({ingredients, navigation}) => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/findByIngredients/?apiKey=676e7283912040069e51ebc4850220cf&ingredients=${ingredients}&number=4&includeNutrition=true.`
          )
            .then(response => response.json())
            .then(data => {
                setRecipes(data)
            })
            .catch(() => {
              console.log("error")
            })
    }, [ingredients]);
    
    const renderItemAccessory = (props, item) => (
      <Button 
        size='tiny'
        onPress={() =>
          navigation.navigate('Ingredients', { id: `${item.id}` })
        }
      >Ingredients</Button>
    );
  

    const renderItem = ({item}) => (
        <ListItem
            title={`${item.title}`}
            description={`${item.id}`}
            accessoryRight={props => renderItemAccessory(props,item)}
            >
        </ListItem>
    
    );
    
    return (
    <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={recipes}
        renderItem={renderItem}
    />
    );

};

export default RecipesGenerator;

const styles = StyleSheet.create({
    container: {
      paddingTop: 50
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