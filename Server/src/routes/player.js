const { Router } = require('express')
const { getAllPlayers, createPlayer, getPlayerDetails } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllPlayers()
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error:error.message})
    }
})

router.post("/create", async (req, res) => {
    try{
        const data = req.body
        const createdPlayer = createPlayer(data)
        res.status(201).json(createdPlayer)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getPlayerDetails(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})

module.exports = router