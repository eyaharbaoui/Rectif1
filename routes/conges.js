const express = require('express')
const router = express.Router();

let CongeController = require('../controllers/CongeController');

router.post('/add-conge', CongeController.create);
router.get('/', CongeController.findAll);
router.get('/:id', CongeController.findOne);
router.put('/update/:id', CongeController.update);

router.delete('/:id', CongeController.delete);
router.delete('/', CongeController.deleteAll);

module.exports = router;