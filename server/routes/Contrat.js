const express = require('express');
const router = express.Router();

let ContratController = require('../controllers/ContratController');

router.post('/add-contrat', ContratController.create);  //post myatlouch f url ajout
router.get('/', ContratController.findAll);//afficher

router.get('/:id', ContratController.findOne);//baaed : maneha param

router.put('/update/:id', ContratController.update);//modifier
router.delete('/:id', ContratController.delete);//supp

router.delete('/', ContratController.deleteAll);//suppall*/


module.exports = router; // yahki ma node aana rout