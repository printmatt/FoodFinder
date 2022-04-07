import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child } from "firebase/database";

const AddRecipe = (id, title) => {
    console.log("added a recipe");
    const dbRef = ref(getDatabase());
    const db = getDatabase();

    get(child(dbRef, `users/${auth.currentUser.uid}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            var userInfo = snapshot.val()
            userInfo.recipes = userInfo.recipes ? userInfo.recipes : {};
            
            //early exit if already added
            if(userInfo.recipes.hasOwnProperty(id)) return userInfo;
            //else
            userInfo.recipes[id] = title
            
            // add ingredients to grocery list
            userInfo.grocery = userInfo.grocery ? userInfo.grocery : {};
            userInfo.grocery = await addIngredients(userInfo.grocery,id).then(newIngredients => {return newIngredients});
            console.log(userInfo.grocery)

            return userInfo;

        } else {
            console.log("No data available");
        }
    }).then((userInfo) => { set(ref(db, '/users/' + auth.currentUser.uid), userInfo) }).
        catch((error) => {
            console.error(error);
        });





    return (true);
}


const addIngredients = async (currentIngredients, newRecipeID) =>{
    await fetch(
       `https://api.spoonacular.com/recipes/${newRecipeID}/information/?apiKey=676e7283912040069e51ebc4850220cf`)
       .then(response => response.json())
       .then(data => {
           var newIngredients = {}
           data.extendedIngredients.map((item) => {
               let name = item.name;
               newIngredients[name] = {amount : item.measures.us.amount, unit : item.unit}
           })

           for(const newItem in newIngredients){
               if(currentIngredients.hasOwnProperty(newItem)){
                   let newAmount = currentIngredients[newItem].amount + newIngredients[newItem].amount;
                   currentIngredients[newItem].amount = newAmount;
               }
               else{
                   currentIngredients[newItem] = newIngredients[newItem];
               }
           }

           

       })
       .catch(() => {
         console.log("error")
       })
       return currentIngredients;
   
}


export default AddRecipe