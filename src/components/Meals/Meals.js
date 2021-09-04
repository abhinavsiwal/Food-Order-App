import React from 'react';
import MealsSummary from "./MealsSummary";
import Card from '../UI/Card'
import AvailableMeals from "./AvailableMeals";
const Meals =()=>{
    return (
        <Card>
            <MealsSummary />
            <AvailableMeals />
        </Card>
    );
}

export default Meals;