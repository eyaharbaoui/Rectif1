const express = require('express');
const router = express.Router();

let userController = require('../controllers/userController');

router.post('/add-user', userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/update/:id', userController.update);
router.delete('/:id', userController.delete);
router.delete('/', userController.deleteAll);

module.exports = router;