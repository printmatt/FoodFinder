import React, { useEffect, useState } from 'react';
import { SafeAreaLayout, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Avatar, Divider, Button } from '@ui-kitten/components';
import FavoriteIngredients from '../components/FavoriteIngredients';
import PersonalInfo from '../components/PersonalInfo';
import AddIngredient from '../components/AddIngredient';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import { getDatabase, ref, child, set } from "firebase/database";

// import Share from 'react-native-share';

// import files from '../json/filesBase64';

const HomeScreen = ({ route }) => {
  const [userInfo, setUserInfo] = useState(route.params.userInfo)
  userInfo.intolerances = userInfo.intolerances?userInfo.intolerances:[]

  const [userId, setUserId] = useState(route.params.userId)
  const navigation = useNavigation();
  const db = getDatabase();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  //add ingredient
  const addIngredient = (title) => {
    let temp = { ...userInfo }
    temp.ingredients = temp.ingredients ? temp.ingredients : []
    temp.ingredients.push({ title: title, selected: false })
    setUserInfo(temp)
    set(ref(db, 'users/' + userId), temp)

  }

  //delete ingredient
  const deleteIngredient = (name, id) => {
    let temp = { ...userInfo }
    temp.ingredients = temp.ingredients.filter((item, index) => {
      return index != id
    })
    setUserInfo(temp)
    set(ref(db, 'users/' + userId), temp)
  }

  //toggle reminder boolean
  const toggleSelected = (id) => {
    let temp = { ...userInfo }
    temp.ingredients = temp.ingredients.map((item, index) => index === id ? { ...item, selected: !item.selected } : item)
    console.log(temp.ingredients)
    console.log(id)
    setUserInfo(temp)

  }

  //edit profile screen
  const editProfile = () => {
    navigation.navigate('Info', { info: userInfo, editInfo: updateProfile })
  }

  //update profile
  const updateProfile = (newInfo) => {
    setUserInfo(newInfo)
    set(ref(db, 'users/' + userId), newInfo)

  }
  const generateRecipes = () => {

    var items = userInfo.ingredients.filter(function (item) {
      if (item['selected']) {
        return item['title'];
      }
    })
    var names = items.map(function (item) {
      return item['title'];
    });

    if (items.length === 0) {
      alert("Please select an ingredient!")
      return;
    }

    navigation.navigate('Recipes', {
      ingredients: `${names.toString()}`,
      intolerances: `${userInfo.intolerances.toString()}`,
      diet: `${userInfo.diet.toString()}`,
      cuisine: `${userInfo.cuisine.toString()}`
    })
  }

  return (
    <Layout style={styles.container}>

      <PersonalInfo info={userInfo} onEdit={editProfile} />
      <Layout style={styles.userInfoSection}>
        <FavoriteIngredients
          favorites={userInfo.ingredients}
          onDelete={deleteIngredient}
          onSelect={toggleSelected}
          onGenerate={generateRecipes}
        ></FavoriteIngredients>
        <AddIngredient onAdd={addIngredient} />
      </Layout>
      <Button style={{ marginTop: 40 }} status={"warning"} onPress={handleSignOut}>Sign Out</Button>

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
    height: 400,
    maxHeight: 400
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
