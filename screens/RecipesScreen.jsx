import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipesGenerator from '../components/RecipesGenerator';
const RecipesScreen = () =>{
  const navigation = useNavigation();
  return (
    <RecipesGenerator ingredients={"chicken,rice"} navigation = {navigation}></RecipesGenerator>
);

} 
export default RecipesScreen