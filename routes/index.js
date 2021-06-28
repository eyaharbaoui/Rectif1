var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', key: Publishable_Key});
});

var jwt = require('express-jwt');

var ctrlAuth = require('../controllers/authentication');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload',
    algorithms: ['RS256']
});

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
//router.post('/forgotPassword', ctrlAuth.forgottenPassword);


module.exports = router;
