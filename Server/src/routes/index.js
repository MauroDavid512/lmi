const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const player = require('./player')
const team = require('./team')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/player', player )
router.use('/team', team)




module.exports = router;
