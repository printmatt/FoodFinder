import React, { useEffect, useState } from 'react';
import { SafeAreaLayout, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Avatar, Divider, Button, ButtonGroup } from '@ui-kitten/components';
import FavoriteIngredients from '../components/FavoriteIngredients';
import PersonalInfo from '../components/PersonalInfo';
import AddIngredient from '../components/AddIngredient';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import { getDatabase, ref, child, set, get } from "firebase/database";

const LogOutIcon = (props) => (
  <Icon {...props} name='log-out' />
);

const GroceryIcon = (props) => (
  <Icon {...props} name='shopping-cart' />
);

const SavedIcon = (props) => (
  <Icon {...props} name='bookmark' />
);

const HomeScreen = ({ route }) => {
  const [userInfo, setUserInfo] = useState(route.params.userInfo)
  userInfo.intolerances = userInfo.intolerances ? userInfo.intolerances : []

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

  const viewSavedRecipes = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
          let temp = snapshot.val()
          if(!temp.recipes) {
            alert("No saved recipes found")
            return;
          }
          navigation.navigate('SavedRecipes',{recipes: temp.recipes});

      } else {
          console.log("No data available");
      }
  })
  }

  const viewGrocery = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
          let temp = snapshot.val()
          if(!temp.grocery) {
            alert("No saved ingredients found")
            return;
          }
          navigation.navigate('Grocery',{grocery: temp.grocery});

      } else {
          console.log("No data available");
      }
  })
  }


  //add ingredient
  const addIngredient = (title) => {
    let temp = { ...userInfo }
    temp.ingredients = temp.ingredients ? temp.ingredients : []
    temp.ingredients.push({ title: title, selected: false })
    setUserInfo(temp)
    set(ref(db, 'users/' + userId + '/ingredients/'), temp.ingredients)

  }

  //delete ingredient
  const deleteIngredient = (name, id) => {
    let temp = { ...userInfo }
    temp.ingredients = temp.ingredients.filter((item, index) => {
      return index != id
    })
    setUserInfo(temp)
    set(ref(db, 'users/' + userId + '/ingredients/'), temp.ingredients)
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
      <ButtonGroup style={{ justifyContent:"center", marginTop: 70 }} appearance='filled' size={"medium"} status={"basic"}>
        <Button onPress={viewSavedRecipes} accessoryRight={SavedIcon}>Recipes</Button>
        <Button onPress={viewGrocery} accessoryRight={GroceryIcon}>Grocery</Button>
        <Button onPress={handleSignOut} accessoryRight={LogOutIcon}>Logout</Button>

      </ButtonGroup>
      

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
  controlContainer: {
    borderRadius: 4,
    marginTop: 40,
    padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
});
