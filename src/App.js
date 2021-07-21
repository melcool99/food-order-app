import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsActive, setCartIsActive] = useState(false);

  const showCartHandler = () => {
    setCartIsActive(true);
  };
  const hideCartHandler = () => {
    setCartIsActive(false);
  };

  return (
    <CartProvider>
      {cartIsActive && <Cart hideCartHandler={hideCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
