//Aqui estarán todas las funciones que se utilizaran durante el ruteo.

const axios = require('axios')
const { Player, Team, Tournament } = require('../db.js')


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


const getTeamDetails = async (id) => {
    try{
        const allTeams = await getAllTeams()
        const team = allTeams.filter((e) => e.id === id)
        console.log(team)
        return team
    }catch(error){
        console.log('Error en función getTeamDetails '+error.message)
    }
}

const getAllTournaments = async () => {
    try{
        const allTournaments = await Tournament.findAll({
            include: {
                model: Team,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }
        })
        return allTournaments
    }catch(error){
        console.log("error en funcion getAllTournaments ---> " + error.message)
    }
}

const createTournament = async (data) => {
    try{
        const {name, description, image, year, teams} = data
        const allTournaments = await getAllTournaments()
        const aux = allTournaments.find(e => e.name === name)
        let Teams = await Team.findAll({
            where: { id: teams },
        }); 
        console.log(Teams)
        if(aux) {
            throw new Error("Ya existe un torneo con ese nombre")
        } else {
            
            let newTournament = await Tournament.create({
                name,
                description,
                image,
                year
            })
            
            newTournament.addTeam(Teams)
            return newTournament
        }
    }catch(error){
        console.log("error en funcion createTournament ---> " + error.message)
    }
}

const getTournamentDetail = async (id) => {
    try{
        try{
            const allTournaments = await getAllTournaments()
            const tournament = allTournaments.filter((e) => e.id === id)
            console.log(tournament)
            return tournament
        }catch(error){
            console.log('Error en función getTournamentDetails '+error.message)
        }
    }catch(error){
        console.log("error en funcion getTournamentDetail ---> " + error.message)
    }
}


module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerDetails,
    getAllTeams,
    createTeam,
    getTeamDetails,
    getAllTournaments,
    createTournament,
    getTournamentDetail
}

