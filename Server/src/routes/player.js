const { Router } = require('express')
const {Player} = require("../db")
const { getAllPlayers, createPlayer, getPlayerDetails, getPlayerTeams, updatePlayer } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllPlayers()
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error:error.message})
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      let player = await Player.destroy({
        where: {
          id: id,
        },
      });
      const actualPlayers = await getAllPlayers()
      return res.status(200).send(actualPlayers);
    } catch (error) {
      console.log("Error en ruta delete jugador", error);
    }
  });

router.get("/teams/:id", async (req, res) => {
    try{
        let id = req.params.id
        const info = await getPlayerTeams(parseInt(id))
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

router.put("/update/:id", async (req, res) => {
    try{
        const data = req.body
        const id = req.params.id
        const info = await updatePlayer(parseInt(id), data)
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error: error.message})
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