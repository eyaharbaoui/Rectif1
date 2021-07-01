const express = require('express');
const router = express.Router();

let tacheController = require('../controllers/tache.controller');

router.post('/add-tache', tacheController.create);
router.get('/',tacheController.findAll);
router.get('/:id',tacheController.findOne);
router.put('/update/:id',tacheController.update);
router.delete('/:id',tacheController.delete);
router.delete('/',tacheController.deleteAll);

module.exports = router;
