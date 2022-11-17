//Aqui estarán todas las funciones que se utilizaran durante el ruteo.

const axios = require('axios')
const { Player, Team } = require('../db.js')


const getAllPlayers = async () => {
    try {
        const allPlayers = await Player.findAll({
            include: {
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return allPlayers
        //Devuelve array con todos los jugadores

    } catch (error) {
        console.log('Error en función getAllPlayers ', error.message)
    }
}

const createPlayer = async (data) => {
    try {
        const {name, image, age, birthday, description} = data
        const allPlayers = await getAllPlayers()
        const aux = allPlayers.find(e => e.name === name)
        if(aux){
            throw new Error("Ya existe es jugador")
        } else {
            const newPlayer = Player.create({
                name,
                image,
                age,
                birthday,
                description
            })
            console.log(newPlayer)
            return newPlayer
        }
    } catch (error) {
        console.log("Error en función createPlayer "+error.message)
    }
}

const getPlayerDetails = async (id) => {
    try{
        const allPlayers = await getAllPlayers()
        const player = allPlayers.filter((e) => e.id === id)
        console.log(player)
        return player
    }catch(error){
        console.log('Error en función getPlayerDetails '+error.message)
    }
}

const getAllTeams = async () => {
    try{
        const allTeams = await Team.findAll({
            include: {
                model: Player,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }
        })
        return allTeams
    }catch(error){
        console.log("Error en función getAllTeam "+error.message)
    }
}

const createTeam = async (data) => {
    try{
        const {name, description, image, players} = data
        const allTeams = await getAllTeams()
        const aux = allTeams.find(e => e.name === name)
        let Players = await Player.findAll({
            where: { id: players },
        }); 
        console.log(Players)
        if(aux) {
            throw new Error("Ya existe un equipo con ese nombre")
        } else {
            
            let newTeam = await Team.create({
                name,
                description,
                image
            })
            
            newTeam.addPlayer(Players)
            return newTeam
        }
    }catch(error) {
        console.log("Error en función createTeam "+error.message)
    }
}



module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerDetails,
    getAllTeams,
    createTeam
}

