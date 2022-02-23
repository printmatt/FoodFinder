import React, { useEffect, useState } from 'react';
import {Layout, Text, List, ListItem, Divider, Card } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

const RecipeInfo = ({id}) => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json/?apiKey=676e7283912040069e51ebc4850220cf`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var ingredientsArr = []
                data.ingredients.map((item) => {
                  ingredientsArr.push(item.amount.us.value + " " + item.amount.us.unit + " " + item.name)
                })
                setIngredients(ingredientsArr)
            })
            .catch(() => {
              console.log("error")
            })
  }, [id]);
  
  console.log(ingredients[0])

  const renderItem = ({ item, index }) => (
    <ListItem title={item}/>
  );

  return (
    <List
      style={styles.container}
      data={ingredients}
      renderItem={renderItem}
    />
  );
};

export default RecipeInfo;

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
