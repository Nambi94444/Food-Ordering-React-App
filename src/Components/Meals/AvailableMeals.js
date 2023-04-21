import Classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [fooditems, setfooditems] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, httperror] = useState();
  useEffect(() => {
    const itemsfeatch = async () => {
      setloading(true);

      const itemsfetcher = await fetch(
        "https://react-d5cdd-default-rtdb.firebaseio.com/meals.json"
      );

      if (!itemsfetcher.ok) {
        throw new Error("error");
      }
      const itemsJson = await itemsfetcher.json();

      const items = [];

      for (const key in itemsJson) {
        items.push({
          id: key,
          name: itemsJson[key].name,
          description: itemsJson[key].description,
          price: itemsJson[key].price,
        });
      }
      setloading(false);
      setfooditems(items);
    };

    itemsfeatch().catch((error) => {
      setloading(false);
      console.log(error.message);
      httperror(error.message);
    });
  }, []);

  const listofmeal = fooditems.map((meal) => (
    <MealItem
      id={meal.id} // this is new!
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (error) {
    return <p className={Classes.errors}>error.message</p>;
  }

  return (
    <section className={Classes.meals}>
      <Card>
        {loading && <p>Loading....</p>}
        <ul>{listofmeal}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
