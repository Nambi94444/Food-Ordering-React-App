import { Fragment, useContext } from "react";
import classes from "./Heder.module.css";
import mealimage from "../../Assert/meals.jpg";
import HeaderIconCart from "../Cart/HeaderIconCart";
import CartContext from "../../Store/CartProvider";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderIconCart setnewCart={props.setNewCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealimage} alt="Food"></img>
      </div>
    </Fragment>
  );
};

export default Header;
