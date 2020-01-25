import React, { useState } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import helpers from './Helpers';
import Header from './Components/Header';
import ProductFooter from './Components/ProductFooter';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart/Cart';

function App() {
  const [ loading, isLoading ] = useState(true);

  /**
   * cart object is like
   * {
   *   id: quantity,
   *   ...
   * }
   */
  const [ cart, setCart ] = helpers.useLocalStorage('cart', {});

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app-body">
          <Switch>
            <Route exact path="/checkout">
              <Cart
                onSetCart={setCart}
                cart={cart}
              />
            </Route>
            <Route path="/">
              <ProductList
                onLoadingChange={isLoading}
                loading={loading}
                onSetCart={setCart}
                cart={cart}
              />
              {loading ? '' : <ProductFooter />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
