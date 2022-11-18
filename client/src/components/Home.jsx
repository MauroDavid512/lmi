import React from "react";
import { useSelector } from "react-redux"
import Init from "./Init";
import Players from "./Players";
import Teams from "./Teams";
import Tournaments from "./Tournaments";
import Games from "./Games";
import Ticket from "./Ticket";
import Contact from "./Contact";


const Home = () => {

    let current = useSelector(state => state.current)
    

    return (
        <div>
            {current==='home'? <Init/> : false}
            {current==='players'? <Players/> : false}
            {current==='teams'? <Teams/> : false}
            {current==='tournaments'? <Tournaments/> : false}
            {current==='games'? <Games/> : false}
            {current==='ticket'? <Ticket/> : false}
            {current==='contact'? <Contact/> : false}
        </div>
    )
}

export default Home