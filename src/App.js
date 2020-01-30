import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import api from './Api';

import useLocalStorage from './Helpers/useLocalStorage';
import Header from './Components/Header';
import ProductFooter from './Components/ProductFooter';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart/Cart';
import Login from './Components/Auth/Login';
import Api from './Api';

function App() {
  const [ loading, isLoading ] = useState(true);

  const [ cart, setCart ] = useLocalStorage('cart', {});
  const [ products, setProducts ] = useState([]);
  const [ productsById, setProductsById ] = useState([]);
  const [ productUpdates, invokeProductUpdate ] = useState(0);
  const [ error, setError ] = useState(false);

  const [ loginItem, updateLoginItem ] = useState({ auth: false });

  const [ client, setClient ] = useLocalStorage({
    name: null,
    email: null,
    address: null,
    phone: null
  });

  // check if logged in
  useEffect(() => {
    Api.logged().then(updateLoginItem);
  }, []);

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
  }, [productUpdates]);

  return (
    <Router>
      <div className="App">
        <Header
          loginItem={loginItem}
          updateLoginItem={updateLoginItem}
        />
        <div className="app-body">
          <Switch>
            <Route exact path="/checkout">
              <Cart
                onSetCart={setCart}
                cart={cart}
                productsById={productsById}
                client={client}
                setClient={setClient}
                loginItem={loginItem}
              />
            </Route>
            <Router exact path="/login">
              <div style={{textAlign:'center'}}>
                <Login
                  loginItem={loginItem}
                  updateLoginItem={updateLoginItem}
                />
              </div>
            </Router>
            <Route path="/">
              <ProductList
                onLoadingChange={isLoading}
                loading={loading}
                onSetCart={setCart}
                cart={cart}
                products={products}
                productsById={productsById}
                error={error}
                update={() => invokeProductUpdate(productUpdates + 1)}
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
