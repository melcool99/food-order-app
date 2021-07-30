import React, { useEffect, useState } from "react";
import classes from "../Meals/AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import useFetch from "../hooks/useFetch";

const AvailableMeals = () => {
  const { handleRequests,setIsLoading, isLoading, error } = useFetch();
  const [mealsData, setMealsData] = useState([]);

  useEffect(() => {
    const getMeals = (data) => {
      const loadeditems = [];
      for (let key in data) {
        loadeditems.push({ id: key, ...data[key] });
      }

      setMealsData(loadeditems);
    };

    handleRequests(
      {
        url: `https://react-http-a3776-default-rtdb.europe-west1.firebasedatabase.app/meals.json`,
      },
      getMeals
      
    );

    getMeals();
    setIsLoading(false)
  }, [handleRequests, setIsLoading]);

  const mealItems = mealsData.map((item) => (
    <MealItem
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    >
      {item.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>{mealItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
