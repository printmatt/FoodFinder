import React, { useEffect, useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Card } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

const useDelayedRender = delay => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay);
    return () => clearTimeout(timeout);
  }, []);
  return fn => !delayed && fn();
};


const RecipeInfo = ({ id }) => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const delayedRender = useDelayedRender(500);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information/?apiKey=676e7283912040069e51ebc4850220cf`)
      .then(response => response.json())
      .then(data => {
        var ingredientsArr = []
        data.extendedIngredients.map((item) => {
          ingredientsArr.push(item.measures.us.amount + " " + item.unit + " " + item.name)
        })

        setIngredients(ingredientsArr)
      })
      .catch(() => {
        console.log("error")
      })
    fetch(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions/?apiKey=676e7283912040069e51ebc4850220cf`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        var instructionsArr = []
        data[0].steps.map((instruction) => {
          instructionsArr.push(instruction.step)
        })

        setInstructions(instructionsArr)
      })
      .catch(() => {
        console.log("error 2")
      })
  }, [id]);

  console.log(ingredients[0])

  const renderItem = ({ item, index }) => (
    <ListItem title={"- " + item} />
  );
  const renderInstructionItem = ({ item, index }) => (
    <ListItem title={(index + 1) + ".  " + item} />
  );

  return (
    <Layout>
      {ingredients.length === 0 || instructions.length === 0 ? delayedRender(() => <Text category='h4' style={styles.header}>Loading.... </Text>)
        : <Layout>
          <Text category='h4' style={styles.header}>INGREDIENTS: </Text>

          <Layout style={styles.userTag}>
            <List
              style={styles.container}
              data={ingredients}
              renderItem={renderItem}
            />
          </Layout>


          <Divider></Divider>
          <Text category='h4' style={styles.header}>INSTRUCTIONS: </Text>
          <Layout style={styles.userTag}>

            <List
              style={styles.container}
              data={instructions}
              renderItem={renderInstructionItem}
            />
          </Layout>
        </Layout>}


    </Layout>

  );
};

export default RecipeInfo;

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  },
  userTag: {
    flexDirection: 'row',
    borderColor: "white",
    borderRadius: 25,
    borderWidth: 5,
    backgroundColor: "#192734",
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    marginTop: 10,
    marginHorizontal: 8,

  },
  contentContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});
