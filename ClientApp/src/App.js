import React, { Component } from 'react';

import NavMenu from './components/NavMenu';
import Home from './components/Home';


import './custom.css';



export default function App(){
    return (
          <>
          <NavMenu />
            <Home />
          </>
    );
  
}
