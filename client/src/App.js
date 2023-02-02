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
import BackGround from './components/Background';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={ <div><div class="center"><BackGround/></div> <Landing/>   </div>} />
        <Route path="/lmi" element={<div><Nav /> </div>} />
        <Route path="/lmi/home" element={<div><div class="center"><BackGround/></div><Nav /><Home /> </div>} />
        <Route path="/lmi/player/:id" element={<div><div class="center"><BackGround/></div><Nav /><PlayerDetail/> </div>} />
        <Route path="/lmi/team/:id" element={<div><div class="center"><BackGround/></div><Nav /><TeamDetail/> </div>} />
        <Route path="/lmi/tournament/:id" element={<div><div class="center"><BackGround/></div><Nav /><TournamentDetail/> </div>} />
      </Routes>
    </div>
  );
}

export default App;
