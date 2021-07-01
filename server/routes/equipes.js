const express = require('express');
const router = express.Router();

let equipeController = require('../controllers/equipe.controller');

router.post('/add-equipe', equipeController.create);
router.get('/',equipeController.findAll);
router.get('/:id',equipeController.findOne);
router.put('/update/:id',equipeController.update);
router.delete('/:id',equipeController.delete);
router.delete('/',equipeController.deleteAll);

module.exports = router;
