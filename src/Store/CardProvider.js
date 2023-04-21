import CartProvider from "./CartProvider";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "add") {
    const indexofitem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    let updateitem;
    let updateditems;
    const existingitem = state.items[indexofitem];

    if (existingitem) {
      updateitem = {
        ...existingitem,
        amount: existingitem.amount + action.item.amount,
      };
      updateditems = [...state.items];
      updateditems[indexofitem] = updateitem;
    } else {
      updateditems = state.items.concat(action.item);
    }

    return { items: updateditems, totalAmount: updateTotalAmount };
    // console.log(updateTotalAmount);
  }
  if (action.type === "remove") {
    const indexofitem = state.items.findIndex((item) => item.id === action.id);
    const currentitem = state.items[indexofitem];
    const updatedtotalamount = state.totalAmount - currentitem.price;
    console.log(updatedtotalamount);
    let updateditems;
    if (currentitem.amount === 1) {
      updateditems = state.items.filter((item) => item.id !== currentitem.id);
    } else {
      const updateditem = { ...currentitem, amount: currentitem.amount - 1 };
      updateditems = [...state.items];
      updateditems[indexofitem] = updateditem;
    }

    return { items: updateditems, totalAmount: updatedtotalamount };
    // const updateditem =
  }
  if (action.type === "clear") {
    return defaultCartState;
  }
};

const CardProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    // console.log(item);
    dispatchCartAction({ type: "add", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "remove", id: id });
  };

  const reseter = () => {
    dispatchCartAction({ type: "clear" });
  };

  const CartProviderr = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    reseter: reseter,
  };
  // console.log(CartProviderr.items);
  return (
    <CartProvider.Provider value={CartProviderr}>
      {props.children}
    </CartProvider.Provider>
  );
};

export default CardProvider;
