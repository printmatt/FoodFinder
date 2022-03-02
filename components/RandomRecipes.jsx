import React, { useEffect, useState } from 'react';
import {Layout, Text, List, ListItem, Divider, Card } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const RandomRecipes = ({count}) => {
    const [recipes, setRecipes] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/random/?apiKey=676e7283912040069e51ebc4850220cf&number=5`
          )
            .then(response => response.json())
            .then(data => {
                setRecipes(data.recipes)
            })
            .catch(() => {
              console.log("error")
            })
    }, [count]);
    
    const renderItemAccessory = (props, item) => (
      <Button 
        size='tiny'
        onPress={() =>
          navigation.navigate('Ingredients', { id: `${item.id}` })
        }
      >SEE MORE</Button>
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

export default RandomRecipes;

const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      flex:1
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