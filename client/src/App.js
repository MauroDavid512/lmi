import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home';
import Landing from './components/Landing';
import Nav from './components/Nav';
import PlayerDetail from './components/player/PlayerDetail';
import TeamDetail from './components/team/TeamDetail';
import TournamentDetail from './components/tournament/TournamentDetail'
import LogAdmin from './components/LogAdmin';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={ <div> <Landing/>  <LogAdmin/> </div>} />
        <Route path="/lmi" element={<Nav />} />
        <Route path="/lmi/home" element={<div><Nav /><Home /> <LogAdmin/></div>} />
        <Route path="/lmi/player/:id" element={<div><Nav /><PlayerDetail/> <LogAdmin/></div>} />
        <Route path="/lmi/team/:id" element={<div><Nav /><TeamDetail/> <LogAdmin/></div>} />
        <Route path="/lmi/tournament/:id" element={<div><Nav /><TournamentDetail/> <LogAdmin/></div>} />
      </Routes>
    </div>
  );
}

export default App;
