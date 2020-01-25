import React, { useState } from 'react';
import './App.css';
// import { Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductList from './Components/ProductList';

function App() {
  const [ loading, isLoading ] = useState(true);
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <ProductList
          onLoadingChange={isLoading}
          loading={loading}
        />
      </div>
      {loading ? '' : <Footer />}
    </div>
  );
}

export default App;
