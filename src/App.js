import React, { Component } from 'react';
import './App.css';

import Cinema from './components/Cinema';

class App extends Component {
  render() {
    return (
        <div className='page-container'>
            <Cinema />
        </div>
    );
  }
}

export default App;
