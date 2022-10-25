const axios = require("axios")
const {Players, Teams} = require("../db")

const createPlayer = async(dataPlayer) =>{
    try{
        const {name, img, age, description} = dataPlayer;
        const arr = getAllPlayers() 
        const aux = aux.find(e => e.name === name)
        if(aux){
            throw new Error('Ya existe un jugador con ese nombre')
        }
        const newPlayer = await Players.create({
            name,
            img,
            age,
            description
        })
    }catch(error){

    }
}

const createTeam = () => {
    try{

    }catch(error){

    }
}

const playerDetail = async (id) => {
    try{
        const allPlayers = getAllPlayers()
        const player = allPlayers.find(e => e.id === id)
        return id
    }catch(error){

    }
}

const getAllPlayers = async () => {
    try {
        const allPlayers = await Players.findAll({
            include: {
                model: Teams,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return allPlayers
        //Devuelve array con todos los pokemons

    } catch (error) {
        console.log('Error en getAllPlayers ', error.message)
    }
};


module.exports = {
    createPlayer,
    getAllPlayers
};