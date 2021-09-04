import { useEffect,useState } from "react";
import Card from "../UI/Card";
import style from "./AvailableMeals";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
    useEffect(() => {
      const fetchMeals=async()=>{
        setIsLoading(true);
      const res=  await fetch('https://food-order-app-3e983-default-rtdb.firebaseio.com/meals.json')
      if(!res.ok){
        throw new Error('Something Went Wrong');
      }
      const data= await res.json();
        const loadedMeals = [];
        for(const key in data){
          loadedMeals.push({
            id:key,
            name:data[key].name,
            description:data[key].description,
            price:data[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      };
        fetchMeals().catch(error=>{
        setIsLoading(false);
        setHttpError(error)
       });
  
    
    }, [])

    if(isLoading){
      return(
        <section className={style.MealsLoading}>
          <p>Loading...</p>
        </section>
      );
    }
    if(httpError){
      return(
      <section className={style.MealsError}>
      <p>{httpError}</p>
    </section>
  );
    }

  const mealsList = meals.map((meal) => (
    <MealItem
        id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={style.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
