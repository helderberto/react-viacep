import React, { Component } from 'react';
import MapImage from './components/MapImage';
import CustomForm from './components/CustomForm';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MapImage height="200" />

        <h1>Buscar endereço</h1>

        <CustomForm />
      </div>
    );
  }
}

export default App;
