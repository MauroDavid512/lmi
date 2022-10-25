import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home';
import Landing from './components/Landing';
import Nav from './components/Nav';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path="/lmi" element={<Nav />} />
        <Route path="/lmi/home" element={<div><Nav /><Home /></div>} />
      </Routes>
    </div>
  );
}

export default App;
