
import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css"
import Meal from "./Meal/Meal";
import Card from "../UI/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHttp from '../hooks/use-http.js'

// const DUMMY_MEALS_DATA = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//       available: true
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//       available: false
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//       available: true
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//       available: false
//     },

//     {
//         id: 'm5',
//         name: 'Red Salsa Chicken',
//         description: 'Spicy and full of protein',
//         price: 28.99,
//         available: true
//     },

//     {
//         id: 'm6',
//         name: 'Burrito Madre',
//         description: 'The best',
//         price: 38.99,
//         available: true
//     },
//   ];

const AvailableMeals = props => {


    const getMealsUrl = "https://food-delivery-e976e-default-rtdb.firebaseio.com/meals.json"

    const {sendRequest: getMeals, isLoading: areMealsLoading, resetLoadingandSetError: resetLoadingandSetError, hasError: fetchingMealsFailedError} = useHttp();
    const [meals, setMeals] = useState([])

    const [showAvailable, setShowAvailable] = useState(false)
    const setActiveButtonClass = showAvailable ? classes.highlighted : classes.default;


    const parseMealsFn = (mealData) => {
        // Object.keys(mealData).map((key) => mealData[key]).map((meal) => {
        //     return {
        //       id: meal.id,
        //       name: meal.name,
        //       description: meal.description,
        //       price: meal.price,
        //       available: meal.available,
        //     };
        // });


        const meals = []
        for(const key in mealData) {
            meals.push({
                id: key,
                name: mealData[key].name,
                description: mealData[key].description,
                price: mealData[key].price,
                available: mealData[key].available
            })
        }
        return meals
    }

    useEffect(() => {
        const fetchMeals = async () => {
            try {
              const mealsData = await getMeals({ url: getMealsUrl }, parseMealsFn);
              setMeals(mealsData);
              console.log(mealsData);
            } catch (error) {
                resetLoadingandSetError(error)
                console.log(error.message)
            }
          };
      
         
        fetchMeals();
         
        

    }, [getMeals, resetLoadingandSetError])

    console.log(meals)

    const mealList = meals.map(mealData => {
        return (
           <Meal mealData={mealData} key={mealData.id}/>
        )  
    })

    const availableMealList = meals.map(mealData => {

        if(mealData.available !== true) {
            return
        }

        return (
           <Meal mealData={mealData} key={mealData.id}/>
        )  
    })

    return (
        <>
            
            <section className={classes.meals}>
                <Card>
                    <button className={setActiveButtonClass} onClick={() => {setShowAvailable(prev => !prev)}}>
                        Show only available

                        {showAvailable ? <FontAwesomeIcon icon="fa-solid fa-toggle-on" size="s"/> : <FontAwesomeIcon icon="fa-solid fa-toggle-off" size="`s"/>}
                    </button>
                    <ul className={classes.meals}>
                        {areMealsLoading && <div className={classes.loading}>Loading...</div>}
                        {fetchingMealsFailedError && <div>Displaying meals failed</div>}
                        {showAvailable ? availableMealList : mealList}
                    </ul>
                </Card>
            </section>
        </>
    )
    
}

export default AvailableMeals
