import React from "react";
import { useState } from "react";
import './App.scss';
import Container from './components/Container/Container';
import TopBar from './components/TopBar/TopBar';
import Menu from "./components/Menu/Menu";



function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toggleCenter, setToggleCenter] = useState(false);


  return (
    <div className="App">
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Container toggleCenter={toggleCenter} setToggleCenter={setToggleCenter}/>

    </div>
  );
}

export default App;
