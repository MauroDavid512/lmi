const { Router } = require('express')
const { getAllPlayers, createPlayer } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllPlayers()
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

module.exports = router