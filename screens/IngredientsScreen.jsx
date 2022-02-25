import React from 'react'
import { useNavigation } from '@react-navigation/native';
import RecipeInfo from '../components/RecipeInfo';
const IngredientsScreen = ({route}) =>{
    const navigation = useNavigation();
    return (
        <RecipeInfo id = {route.params.id}></RecipeInfo>
    );
} 

export default IngredientsScreen