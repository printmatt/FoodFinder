import React, { useEffect, useState } from 'react';
import { SafeAreaLayout, StyleSheet } from 'react-native';
import { Layout, Text, Icon, Avatar, Divider } from '@ui-kitten/components';
import FavoriteIngredients from '../components/FavoriteIngredients';
import PersonalInfo from '../components/PersonalInfo';
import AddIngredient from '../components/AddIngredient';
import { useNavigation } from '@react-navigation/native';
// import Share from 'react-native-share';

// import files from '../json/filesBase64';

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState(require('../json/info.json'))
  const navigation = useNavigation();

  //add ingredient
  const addIngredient = (title) => {
    const temp = {...userInfo}
    temp.ingredients.push({title:title,selected:false})
    setUserInfo(temp)
  }

  //delete ingredient
  const deleteIngredient = (name, id) => {
    let temp = {...userInfo}
    temp.ingredients = temp.ingredients.filter((item,index) => {
      return index != id
    })
    setUserInfo(temp)  
  }

  //toggle reminder boolean
  const toggleSelected = (id) =>{
    let temp = {...userInfo}
    temp.ingredients = temp.ingredients.map((item,index) => index === id ? {...item,selected:!item.selected} : item)
    console.log(temp.ingredients)
    console.log(id)
    setUserInfo(temp)
  }

  //edit profile screen
  const editProfile = () => {
    navigation.navigate('Info',{info: userInfo, editInfo: updateProfile})
  }

  //update profile
  const updateProfile = (newInfo) => {
    setUserInfo(newInfo)
  }
  const generateRecipes = () => {
    
    var items = userInfo.ingredients.filter(function(item) {
      if (item['selected']) {
        return item['title'];
      }
    })
    var names = items.map(function(item) {
      return item['title'];
    });

    if(items.length===0){
      alert("Please select an ingredient!")
      return;
    }

    navigation.navigate('Recipes', {ingredients: `${names.toString()}`,
                                    intolerances: `${userInfo.intolerances.toString()}`,
                                    diet: `${userInfo.diet.toString()}`,
                                    cuisine: `${userInfo.cuisine.toString()}` })
  }

  return (
    <Layout style={styles.container}>
      <PersonalInfo info={userInfo} onEdit = {editProfile}/>
      <Layout style={styles.userInfoSection}>
        <FavoriteIngredients 
          favorites={userInfo.ingredients}
          onDelete = {deleteIngredient}
          onSelect = {toggleSelected}
          onGenerate = {generateRecipes}
         ></FavoriteIngredients>
        <AddIngredient onAdd={addIngredient}/>
      </Layout>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userHeader: {
    paddingHorizontal: 30,
    marginTop: 50,
    marginBottom: 25,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    maxHeight: 360,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    //marginLeft: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
