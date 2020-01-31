import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './Api';

import useLocalStorage from './Helpers/useLocalStorage';
import Header from './Components/Header';
import ProductFooter from './Components/ProductFooter';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart/Cart';
import LoginAndRegister from './Components/Auth/LoginAndRegister';
import Api from './Api';

function App() {
  const EMPTY_CLIENT = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  const [ loading, isLoading ] = useState(true);

  const [ cart, setCart ] = useLocalStorage('cart', {});
  const [ products, setProducts ] = useState([]);
  const [ productsById, setProductsById ] = useState([]);
  const [ productUpdates, invokeProductUpdate ] = useState(0);
  const [ error, setError ] = useState(false);

  const [ loginItem, updateLoginItem ] = useState({ auth: null });

  const [ client, setClient ] = useLocalStorage(EMPTY_CLIENT);

  // check if logged in
  useEffect(() => {
    Api.logged().then(item => {
      updateLoginItem(item);
    });
  }, []);

  useEffect(() => {
    setClient(loginItem.client || EMPTY_CLIENT);
    // eslint-disable-next-line
  }, [loginItem])

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
    <Router forceRefresh={true}>
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
              <LoginAndRegister
                loginItem={loginItem}
                updateLoginItem={updateLoginItem}
              />
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
