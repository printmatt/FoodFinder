import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
const RecipesScreen = ({route}) =>{
  const navigation = useNavigation();
  return (
    <RecipesGenerator ingredients={route? route.params.ingredients : "chicken,rice"} navigation = {navigation}></RecipesGenerator>
);

} 
export default RecipesScreen