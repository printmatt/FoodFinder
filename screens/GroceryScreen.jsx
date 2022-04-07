import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
import { Layout, TopNavigationAction, TopNavigation, List, ListItem } from '@ui-kitten/components';
import { Button, Icon, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);


const GroceryScreen = ({route}) => {
  const ingredients = route.params.grocery;
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
          status={"success"}
          onPress={() =>
              console.log("buy")
          }
      >CHECK</Button>
  );


  const renderItem = ({ item }) => (
      <ListItem
          title={`${item}`}
          description={`${ingredients[item].amount} ${ingredients[item].unit}`}
          accessoryRight={props => renderItemAccessory(props, item)}
      >
      </ListItem>

  );

  return (
      <Layout style={styles.container}>
          <TopNavigation title='Grocery List' alignment='center' accessoryLeft={BackAction} />

          <List
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
              data={Object.keys(ingredients)}
              renderItem={renderItem}
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