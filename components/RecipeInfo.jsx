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
  const [nutrients, setNutrients] = useState({})
  const delayedRender = useDelayedRender(500);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information/?apiKey=676e7283912040069e51ebc4850220cf&includeNutrition=true`)
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
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json/?apiKey=676e7283912040069e51ebc4850220cf`)
      .then(response => response.json())
      .then(data => {
        var nutrientsInfo = {}
        nutrientsInfo.calories = data.calories;
        nutrientsInfo.carbs = data.carbs;
        nutrientsInfo.fat = data.fat;
        nutrientsInfo.protein = data.protein;

        setNutrients(nutrientsInfo)
      })
      .catch(() => {
        console.log("error 2")
      })
    fetch(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions/?apiKey=676e7283912040069e51ebc4850220cf`)
      .then(response => response.json())
      .then(data => {
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


  const renderItem = ({ item, index }) => (
    <ListItem title={"- " + item} />
  );
  const renderInstructionItem = ({ item, index }) => (
    <ListItem title={(index + 1) + ".  " + item} />
  );

  const renderNutrition = ({ item }) => (
    <ListItem title={`${item.charAt(0).toUpperCase() + item.slice(1)} : ${nutrients[item]}`} />
  );

  return (
    <Layout>
      {ingredients.length === 0 || instructions.length === 0 ? delayedRender(() => <Text category='h4' style={styles.header}>Loading.... </Text>)
        : <Layout>

          {/* Instructions */}
          <Layout flexDirection={'row'} justifyContent={'center'}>
            <Text category='h5' style={styles.header}>Instructions</Text>
          </Layout>

          {/* Instructions Contents */}
          <Layout flexDirection={'row'}>
            <Layout style={styles.userTag}>

              <List
                style={styles.container}
                data={instructions}
                renderItem={renderInstructionItem}
              />
            </Layout>
          </Layout>

          {/* Ingredients and nutrients */}
          <Layout flexDirection={'row'} justifyContent={'space-between'} style={{ marginHorizontal: 20 }}>
            <Text status='success' category='h5' style={styles.header}>Ingredients </Text>
            <Text status='warning' category='h5' style={styles.header}>Nutrients Info</Text>
          </Layout>

          {/* Ingredients and nutrients information */}
          <Layout flexDirection={'row'} justifyContent={'space-around'}>
            <Layout style={styles.userTag}>
              <List

                style={styles.container}
                data={ingredients}
                renderItem={renderItem}
              />

            </Layout>
            <Layout style={styles.userTag}>
              <List
                style={styles.container}
                data={Object.keys(nutrients)}
                renderItem={renderNutrition}
              />

            </Layout>
          </Layout>

        </Layout>}


    </Layout>

  );
};

export default RecipeInfo;

const styles = StyleSheet.create({
  container: {
    maxHeight: 230,

  },
  userTag: {
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 5,
    backgroundColor: "#192734",
    margin: 5,
    padding: 5,
    flex: 1
  },
  header: {
    marginTop: 5,
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
