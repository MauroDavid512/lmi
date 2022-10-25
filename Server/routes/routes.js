const { Router } = require('express')
const router= Router();
const { getAllPlayers, createPlayer } = require("./utils")

router.get("/", async (req, res) => {
    try{
        const info = await getAllPlayers()
        const {name} = req.query
        if(name) {
            try{

            }catch(error){

            }
        }
    }catch(error){
        
    }
})