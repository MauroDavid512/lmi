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
            throw new Error("Ya existe ese jugador")
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
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return allTeams
    }catch(error){

    }
}

const createTeam = async (data) => {
    try{
        const {name, description, image, players} = data
        const allTeams = await getAllTeams()
        console.log(allTeams)
        const aux = allTeams.find(e => e.name === name)
        let namePlayer = await Player.findAll({
            where: { name: players },
        }); 
        if(aux) {
            throw new Error("Ya existe un equipo con ese nombre")
        } else {
            const newTeam = Team.create({
                name,
                description,
                image
            })
            
            newTeam.addPlayer(namePlayer)
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

