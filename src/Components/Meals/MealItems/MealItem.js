import { useContext } from "react";
import Classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/CartProvider";
const MealItem = (props) => {
  const cox = useContext(CartContext);
  const price = `$ ${props.price}`;

  const addtoitems = (amount) => {
    // console.log(amount);
    cox.addItem({
      key: props.id,
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    console.log(props.id);
  };
  return (
    <li className={Classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={Classes.description}>{props.description}</div>
        <div className={Classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props} additemstomeal={addtoitems} />
      </div>
    </li>
  );
};

export default MealItem;
