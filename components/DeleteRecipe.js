import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child } from "firebase/database";

const DeleteRecipe = (id, title) => {
    const dbRef = ref(getDatabase());
    const db = getDatabase();

    get(child(dbRef, `users/${auth.currentUser.uid}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            var userInfo = snapshot.val()
            userInfo.recipes = userInfo.recipes ? userInfo.recipes : {};

            //early exit if already deleteed
            if (!userInfo.recipes.hasOwnProperty(id)) return userInfo;
            //else
            delete userInfo.recipes[id]

            // delete ingredients to grocery list
            userInfo.grocery = userInfo.grocery ? userInfo.grocery : {};
            userInfo.grocery = await deleteIngredients(userInfo.grocery, id).then(newIngredients => { return newIngredients });

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


const deleteIngredients = async (currentIngredients, newRecipeID) => {
    await fetch(
        `https://api.spoonacular.com/recipes/${newRecipeID}/information/?apiKey=676e7283912040069e51ebc4850220cf`)
        .then(response => response.json())
        .then(data => {
            var newIngredients = {}
            console.log("check 0")
            data.extendedIngredients.map((item) => {
                let name = item.name;
                newIngredients[name] = { amount: item.measures.us.amount, unit: item.measures.us.unitLong!==""?item.measures.us.unitLong:"US unit" }
            })
            console.log("check 1")

            for (const newItem in newIngredients) {
                if (currentIngredients.hasOwnProperty(newItem)) {
                    let unitToDelete = newIngredients[newItem].unit.toString()
                    let amountToDelete = Number(newIngredients[newItem].amount)

                    if (currentIngredients[newItem].hasOwnProperty(unitToDelete)) {
                        let newAmount = currentIngredients[newItem][unitToDelete] - amountToDelete;
                        currentIngredients[newItem][unitToDelete] = newAmount;
                    }

                    if(currentIngredients[newItem][unitToDelete] <= 0){
                        delete currentIngredients[newItem][unitToDelete];
                    }

                }
            }
            console.log("check 2")


        })
        .catch(() => {
            console.log("error")
        })
    return currentIngredients;

}


export default DeleteRecipe