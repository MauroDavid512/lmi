import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions'





const CreatePlayer = () => {

    let dispatch = useDispatch()

    React.useEffect(()=> {
        dispatch(actions.getAllPlayers())
    })

    let allPlayers = useSelector(state => state.players)  

    const [newPlayer, setNewPlayer] = React.useState({
        name:"",
        image:"",
        age:"",
        birthday: "",
        description: ""
    })




} 

export default CreatePlayer