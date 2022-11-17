const { Router } = require('express')
const { getAllTeams, createTeam } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllTeams()
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.post("/create", async (req, res) => {
    try{
        const data = req.body
        const createdTeam = createTeam(data)
        res.status(200).json(createdTeam)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

module.exports = router