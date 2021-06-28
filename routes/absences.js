const express = require('express')
const router = express.Router();

let AbsenceController = require('../controllers/AbsenceController');

router.post('/add-absence', AbsenceController.create);
router.get('/', AbsenceController.findAll);
router.get('/:id', AbsenceController.findOne);
router.put('/update/:id', AbsenceController.update);

router.delete('/:id', AbsenceController.delete);
router.delete('/', AbsenceController.deleteAll);

module.exports = router;