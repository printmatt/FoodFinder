import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
import { Layout, TopNavigationAction, TopNavigation } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const RecipesScreen = ({route}) =>{
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction style={styles.header} icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation title='Recipes' alignment='center' accessoryLeft={BackAction}/>

      <RecipesGenerator ingredients={route.params.ingredients} intolerances={route.params.intolerances}
     diet={route.params.diet} cuisine={route.params.cuisine} navigation = {navigation}/>


    </Layout>
);

} 
export default RecipesScreen

const styles = StyleSheet.create({
  header:{
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