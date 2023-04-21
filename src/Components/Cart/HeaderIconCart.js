import CartIcon from "./CartIcon";
import Classes from "./HeaderIconCart.module.css";
import CartContext from "../../Store/CartProvider";
import { useContext, useEffect, useState } from "react";

const HeaderIconCart = (props) => {
  const [effectstate, seteffect] = useState(false);
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx.items);
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    // console.log(item);
    return currentNumber + item.amount;
  }, 0);

  const { items } = cartCtx;
  useEffect(() => {
    if (cartCtx.items === 0) return;

    seteffect(true);
    const timer = setTimeout(() => {
      seteffect(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [items]);
  const buttoneffect = `${Classes.button} ${effectstate ? Classes.bump : ""}`;
  return (
    <button className={buttoneffect} onClick={props.setnewCart}>
      <span className={Classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={Classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderIconCart;
