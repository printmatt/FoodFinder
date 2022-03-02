import React, { useEffect, useState } from 'react';
import {Layout, Text, List, ListItem, Divider, Card } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RandomRecipes from '../components/RandomRecipes';
const RandomRecipesScreen = () => {
    const [num, setNum] = useState(0)
    
    return (
      <Layout style={styles.container}>
        <RandomRecipes count={num}></RandomRecipes>
        <Button 
        style={styles.button}
        onPress={() =>
          setNum(num+1)
        }
      >NEW RECIPES</Button>
      </Layout>
      
    );

};

export default RandomRecipesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    button: {
      marginBottom: 20,
      marginTop:20
    },

  });