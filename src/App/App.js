import React, { Component } from 'react';
import Header from '../Components/Header';
import Intro from '../Screens/Intro';
import RetroIntro from '../Screens/RetroIntro';
import '../Fonts/Gotham.css';
import './Variables.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Intro />
        <Header />
      </div>
    );
  }
}

export default App;
