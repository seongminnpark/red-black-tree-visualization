import React, { Component } from 'react';
import './App.css';

import TreeTest from './core/tree/TreeTest'

import { Canvas } from './views/pages'

class App extends Component {
  render() {

     var test = new TreeTest() 
     test.run();


    return (
      <div className="App">
        
        <Canvas/>
        
      </div>
    );
  }
}

export default App;
