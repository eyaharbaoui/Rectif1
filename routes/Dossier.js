const express = require('express');
const router = express.Router();

let DossierController = require('../controllers/DossierController');

router.post('/add-dossier', DossierController.create);
router.get('/', DossierController.findAll);
router.get('/:id', DossierController.findOne);
router.put('/update/:id', DossierController.update);
router.delete('/:id', DossierController.delete);
router.delete('/', DossierController.deleteAll);


module.exports = router;