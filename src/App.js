import React, { useState } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
// import { Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import ProductFooter from './Components/ProductFooter';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart/Cart';

function App() {
  const [ loading, isLoading ] = useState(true);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app-body">
          <Switch>
            <Route exact path="/checkout">
              <Cart/>
            </Route>
            <Route path="/">
              <ProductList
                onLoadingChange={isLoading}
                loading={loading}
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
