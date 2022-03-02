import React, { useEffect, useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Card, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const WarningIcon = (props) => (
  <Icon {...props} name='alert-triangle-outline' />
);

const useDelayedRender = delay => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay);
    return () => clearTimeout(timeout);
  }, []);
  return fn => !delayed && fn();
};

const RecipesGenerator = ({ ingredients, intolerances, diet, navigation }) => {

  const [recipes, setRecipes] = useState([]);
  const delayedRender = useDelayedRender(1000);

  useEffect(() => {

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch/?apiKey=676e7283912040069e51ebc4850220cf&includeIngredients=${ingredients}&intolerances=${intolerances}&diet=${""}&number=4`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setRecipes(data.results)
      })
      .catch(() => {
        console.log("error")
      })
  }, [ingredients, intolerances, diet]);

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
        navigation.navigate('Ingredients', { id: `${item.id}` })
      }
    >SEE MORE</Button>
  );


  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.id}`}
      accessoryRight={props => renderItemAccessory(props, item)}
    >
    </ListItem>

  );

  return (
    <Layout>
      {recipes.length == 0 ?
        delayedRender(() =>  <Layout style={styles.emptyMessage}>
        <Icon
          style={styles.icon}
          name='heart'
        />
        <Text style={styles.text}>Oops... Looks like there is no recipes</Text>
        <Text style={styles.text}>that matches your preferences.</Text>
        <Text style={styles.text}>Please try again with different ingredients!</Text>

      </Layout>)
         : 
         <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={recipes}
          renderItem={renderItem} />
      }
    </Layout>

  );

};

export default RecipesGenerator;

const styles = StyleSheet.create({
  header: {
    paddingTop: 100,
  },
  container: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emptyMessage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center'
  },
  icon: {
    width: 32,
    height: 32,
  },
  item: {
    marginVertical: 4,
  },
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});