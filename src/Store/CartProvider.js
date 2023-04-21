import React from "react";

const CartProvider = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: {},
  removeItem: {},
  reseter: {},
});

export default CartProvider;
