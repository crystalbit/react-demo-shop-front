import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import api from './Api';

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
  const [ products, setProducts ] = useState([]);
  const [ productsById, setProductsById ] = useState([]);
  const [ updates, invokeUpdate ] = useState(0);
  const [ error, setError ] = useState(false);


  useEffect(() => {
      api.getProducts()
      .then(products => {
          if (!products) {
              setError(true);
          } else {
              setError(false);
              isLoading(false);
              setProducts(products);
              let productsObject = {};
              products.forEach(product => {
                  productsObject[product.id] = product;
              })
              setProductsById(productsObject);
          }
      })
      .catch(() => setError(true));
  }, [updates]);

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
                productsById={productsById}
              />
            </Route>
            <Route path="/">
              <ProductList
                onLoadingChange={isLoading}
                loading={loading}
                onSetCart={setCart}
                cart={cart}
                products={products}
                productsById={productsById}
                error={error}
                update={() => invokeUpdate(updates + 1)}
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
