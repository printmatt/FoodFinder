import React from 'react'

const IngredientsScreen = ({navigation,route}) => (
      <RecipeInfo id = {route.params.id}></RecipeInfo>
  );

export default IngredientsScreen