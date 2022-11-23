//Aqui estarán todas las funciones que se utilizaran durante el ruteo.

const axios = require('axios')
const { Player, Team, Tournament, Game } = require('../db.js')

const prePlayers = require('../preloads/players.json')
const preTeams = require('../preloads/teams.json')
const preTournaments = require('../preloads/tournaments.json')
const preGames = require('../preloads/games.json')


// FUNCIONES DE JUGADORES ----------------------------------------

const getAllPlayers = async () => {
    try {
        const allPlayers = await Player.findAll({
            include: {
                model: Team,
                attributes: ['id', 'name', 'image'],
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
        const { name, image, age, birthday, description } = data
        const allPlayers = await getAllPlayers()
        const aux = allPlayers.find(e => e.name === name)
        if (aux) {
            throw new Error("Ya existe es jugador")
        } else {
            const newPlayer = Player.create({
                name,
                image,
                age,
                birthday,
                description
            })
            return newPlayer
        }
    } catch (error) {
        console.log("Error en función createPlayer " + error.message)
    }
}

const getPlayerDetails = async (id) => {
    try {
        const allPlayers = await getAllPlayers()
        const player = allPlayers.filter((e) => e.id === id)
        return player[0]
    } catch (error) {
        console.log('Error en función getPlayerDetails ' + error.message)
    }
}


// FUNCIONES DE EQUIPOS -------------------------------------------


const getAllTeams = async () => {
    try {
        const allTeams = await Team.findAll({
            include: {
                model: Player,
                attributes: ['id', 'name', 'image'],
                through: {
                    attributes: []
                },    
            },
            
        })
        return allTeams
    } catch (error) {
        console.log("Error en función getAllTeam " + error.message)
    }
}






const createTeam = async (data) => {
    try {
        const { name, description, image, players } = data
        const allTeams = await getAllTeams()
        const aux = allTeams.find(e => e.name === name)
        let Players = await Player.findAll({
            where: { id: players },
        });
        if (aux) {
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
    } catch (error) {
        console.log("Error en función createTeam " + error.message)
    }
}


const getTeamDetails = async (id) => {
    try {
        const allTeams = await getAllTeams()
        const team = allTeams.filter((e) => e.id === id)
        return team[0]
    } catch (error) {
        console.log('Error en función getTeamDetails ' + error.message)
    }
}


// FUNCIONES DE TORNEOS -----------------------------------------------------

const getAllTournaments = async () => {
    try {
        const allTournaments = await Tournament.findAll({
            include: {
                model: Team,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            }
        })
        return allTournaments
    } catch (error) {
        console.log("error en funcion getAllTournaments ---> " + error.message)
    }
}

const createTournament = async (data) => {
    try {
        const { name, description, image, year, teams } = data
        const allTournaments = await getAllTournaments()
        const aux = allTournaments.find(e => e.name === name)
        let Teams = await Team.findAll({
            where: { id: teams },
        });
        if (aux) {
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
    } catch (error) {
        console.log("error en funcion createTournament ---> " + error.message)
    }
}

const getTournamentDetail = async (id) => {
    try {
        const allTournaments = await getAllTournaments()
        const tournament = allTournaments.filter((e) => e.id === id)
        return tournament[0]
    } catch (error) {
        console.log('Error en función getTournamentDetails ' + error.message)
    }
}

// FUNCIONES DE JUEGOS ------------------------------------------------

const createGame = async (data) => {
    try {
        const { name, description, image, type, teamsNumber, playersNumber } = data
        const allGames = await getAllGames()
        const aux = allGames.find(e => e.name === name)
        if (aux) {
            throw new Error('Ya existe un juego con ese nombre')
        } else {
            let newGame = await Game.create({
                name,
                description,
                image,
                type,
                teamsNumber,
                playersNumber
            })
            return newGame
        }
    } catch (error) {
        console.log('Error en funcion createGame ---> ' + error.message)
    }
}

const getAllGames = async () => {
    try {
        const allGames = await Game.findAll()
        return allGames
    } catch (error) {
        console.log("error en funcion getAllGames ---> " + error.message)
    }
}

const getGameDetail = async (id) => {
    try {
        const allGames = getAllGames()
        const game = allGames.filter(e => e.id === id)
        return game[0]
    } catch (error) {
        console.log('Error en funcion getGameDetail ---> ' + error.message)
    }
}


// Funciones Pre-load -------------------------------------------------->

const preloadPlayers = async () => {

    try {
        let data = prePlayers.map((players) => {
            return {
                name: players.name,
                image: players.image,
                age: players.age,
                birthday: players.birthday,
                description: players.description
            };
        });

        for (const player of data) {
            createPlayer(player);
        }

        return data;
    } catch (error) {
        console.log("ERROR EN preload_players", error.message);
    }
};

const preloadTeams = async () => {

    try {
        let data = preTeams.map((teams) => {
            return {
                name: teams.name,
                image: teams.image,
                description: teams.description,
                players: teams.players
            };
        });

        for (const team of data) {
            createTeam(team);
        }

        return data;
    } catch (error) {
        console.log("ERROR EN preload_teams", error.message);
    }
};

const preloadTournaments = async () => {
    try {
        let data = preTournaments.map((tournaments) => {
            let teams = tournaments.teams.map(e => parseInt(e))
            console.log(teams)
            return {
                name: tournaments.name,
                image: tournaments.image,
                teams: teams,
                year: tournaments.year,
                description: tournaments.description
            };
        });
        for (const tournament of data) {

            createTournament(tournament);
        }

        return data;
    } catch (error) {
        console.log("ERROR EN preload_tournaments ", error.message);
    }
};

const preloadGames = async () => {

    try {
        let data = preGames.map((games) => {
            return {
                name: games.name,
                image: games.image,
                description: games.description,
                teamsNumber: games.teamsNumber,
                playersNumber: games.playersNumber,
                type: games.type
            };
        });

        for (const game of data) {
            createGame(game);
        }

        return data;
    } catch (error) {
        console.log("ERROR EN preload_games", error.message);
    }
};

// Filtros -------------------------------------------------------


const getPlayerTeams = async (id) => {
    try {

        let player = await getPlayerDetails(id)
        return player.teams

    } catch (error) {
        console.log('Error en funcion getPlayerTeams ' + error.message)
    }
}

const getTeamPlayers = async (id) => {
    try {
        let team = await getTeamDetails(id)
        return team.players
    } catch (error) {
        console.log('Error en getTeamPlayers ' + error.message)
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
    getTournamentDetail,
    getPlayerTeams,
    getTeamPlayers,
    createGame,
    getAllGames,
    getGameDetail,
    //funcionalidades preload
    preloadPlayers,
    preloadTeams,
    preloadTournaments,
    preloadGames
}

