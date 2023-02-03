const { Router } = require('express')
const { Game } = require("../db")
const { getAllGames, getGameDetail, createGame } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllGames()
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error:error.message})
    }
})


router.post("/create", async (req, res) => {
    try{
        const data = req.body
        const createdPlayer = createGame(data)
        res.status(201).json(createdPlayer)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getGameDetail(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      let game = await Game.destroy({
        where: {
          id: id,
        },
      });
  
      return res.status(200).send("Juego Borrado");
    } catch (error) {
      console.log("Error en ruta delete juego", error);
    }
  });

module.exports = router