import React from 'react';
import {BrowserRouter, useLocation} from 'react-router-dom';
import "./App.css";
import RoutesElement from './RoutesElement';

function App() {
  return (
    <BrowserRouter>
      <RoutesElement />
    </BrowserRouter>
  )
}

export default App;
