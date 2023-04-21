import Classes from "./Cart.module.css";
import Model from "../UI/Model";
import { useContext, useState } from "react";
import CartProvider from "../../Store/CartProvider";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import React from "react";

const Cart = (props) => {
  const [popcheckout, setcheckout] = useState(false);
  const [issubmit, setSubmit] = useState(false);
  const [isscess, setscess] = useState(false);

  const getdata = useContext(CartProvider);
  const totalamount = `$${getdata.totalAmount.toFixed(2)}`;
  const hasitems = getdata.items.length > 0;
  console.log(props.items);
  // console.log(getdata.totalAmount);
  const cartremovehandler = (a) => {
    getdata.removeItem(a);
  };
  const cartaddhandler = (item) => {
    getdata.addItem(item);
  };

  const checkouthandler = () => {
    setcheckout(true);
  };

  const SubmitHandler = (data) => {
    setSubmit(true);
    const featcher = async () => {
      const Ab = await fetch(
        "https://react-d5cdd-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({ user: data, orderdetails: getdata.items }),
        }
      );
      setSubmit(false);
      setscess(true);

      if (!Ab.ok) {
        throw new Error("Error");
      }
    };
    const A = featcher().catch((a) => console.log(a.message));
    getdata.reseter();
  };

  const list = (
    <ul className={Classes["cart-items"]}>
      {getdata.items.map((A) => {
        // console.log(cartaddhandler.bind(null, A.item));
        return (
          <CartItem
            key={A.id}
            name={A.name}
            amount={A.amount}
            price={A.price}
            onRemove={cartremovehandler.bind(null, A.id)}
            onAdd={cartaddhandler.bind(null, A)}
          />
        );
      })}
    </ul>
  );

  const modelAction = (
    <div className={Classes.actions}>
      <button className={Classes["button--alt"]} onClick={props.closee}>
        Close
      </button>
      {hasitems && (
        <button className={Classes.button} onClick={checkouthandler}>
          Order
        </button>
      )}
    </div>
  );

  const carttag = (
    <React.Fragment>
      {list}
      <div className={Classes.total}>
        <span>Total Amount </span>
        <span> {totalamount}</span>
      </div>
      {popcheckout && (
        <Checkout close={props.closee} onConfirm={SubmitHandler} />
      )}
      {!popcheckout && modelAction}
    </React.Fragment>
  );
  const submitted = (
    <React.Fragment>
      <p>order Submited</p>
      <div className={Classes.actions}>
        <button className={Classes.button} onClick={props.closee}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  console.log(`${isscess} ${issubmit}`);
  return (
    <Model close={props.closee}>
      {!issubmit && !isscess && carttag}
      {issubmit && <p>Submitting....</p>}
      {isscess && !issubmit && submitted}
    </Model>
  );
};

export default Cart;
