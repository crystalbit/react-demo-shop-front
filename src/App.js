import React from 'react';
import './App.css';
// import { Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import ProductList from './Components/ProductList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
          <ProductList />
      </div>
    </div>
  );
}

export default App;
