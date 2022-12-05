const { Router } = require('express')
const { getAllTeams, createTeam, getTeamDetails, getTeamPlayers, updateTeam } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllTeams()
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})


router.get("/players/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getTeamPlayers(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})


router.post("/create", async (req, res) => {
    try{
        const data = req.body
        const createdTeam = await createTeam(data)
        res.status(201).json(createdTeam)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getTeamDetails(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})

router.put("/update/:id", async (req, res) => {
    try{
        const data = req.body
        const id = req.params.id
        const info = await updateTeam(parseInt(id), data)
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})


module.exports = router