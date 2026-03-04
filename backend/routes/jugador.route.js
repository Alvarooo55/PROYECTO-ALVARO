const express = require('express');
const  trajeCtrl = require('../controllers/jugador.controller');
const router = express.Router();


router.get('/', trajeCtrl.getJugadores);
router.get('/jugador/:id', trajeCtrl.getJugador);
router.post('/publicar', trajeCtrl.addJugador);
router.put('/actualizar/:id', trajeCtrl.updateJugador);
router.delete('/eliminar/:id', trajeCtrl.deleteJugador);

module.exports = router;