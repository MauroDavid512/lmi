const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const player = require('./player')
const team = require('./team')
const tournament = require('./tournaments')
const game = require('./game')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/player', player )
router.use('/team', team)
router.use('/tournament', tournament)
router.use('/game', game)




module.exports = router;
