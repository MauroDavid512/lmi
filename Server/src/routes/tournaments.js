const { Router } = require('express')
const { Tournament } = require("../db")
const { getAllTournaments, createTournament, getTournamentDetail, updateTournament } = require('./utils')
const router = Router();

router.get("/", async (req, res) => {
    try{
        const info = await getAllTournaments()
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.post("/create", async (req, res) => {
    try{
        const data = req.body
        const createdTournament = await createTournament(data)
        res.status(201).json(createdTournament)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getTournamentDetail(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})

router.put("/update/:id", async (req, res) => {
    try{
        const data = req.body
        const id = req.params.id
        const info = await updateTournament(parseInt(id), data)
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      let tournament = await Tournament.destroy({
        where: {
          id: id,
        },
      });
  
      return res.status(200).send("Torneo Borrado");
    } catch (error) {
      console.log("Error en ruta delete Torneo", error);
    }
  });


module.exports = router