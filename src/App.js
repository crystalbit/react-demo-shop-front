import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Header from './Components/Header';
import Menu from './Components/Menu';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
          <Menu />
          <div className="content">
            ---=== the CONTENT ===---
          </div>
      </div>
    </div>
  );
}

export default App;
