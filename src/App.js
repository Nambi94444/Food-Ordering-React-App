import { Fragment, useState } from "react";
import Header from "./Components/Layout/Header";
import Meal from "./Components/Meals/Meal";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CardProvider";

function App() {
  const [oldCart, NewCart] = useState(false);

  const SetNewCartopen = () => {
    NewCart(true);
    // console.log(oldCart);
  };

  const SetNewCartclose = () => {
    NewCart(false);
    console.log(oldCart);
  };

  return (
    <CartProvider>
      {oldCart && <Cart closee={SetNewCartclose} />}
      <Header setNewCart={SetNewCartopen} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
}

export default App;
