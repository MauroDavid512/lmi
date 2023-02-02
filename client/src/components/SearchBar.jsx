import React, { useState } from 'react';
import * as actions from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import lupa from "../imgs/lupa.png"

export default function SearchBar() {
  
  

  return (
    <form class="flex">
        
<input type="text" name="text" class="input" placeholder="Buscar..."></input>
      <div><img class="iconoBuscar" src={lupa} alt="" /></div>
    </form>
  )
};