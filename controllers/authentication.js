var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.login = function (req, res) {

    passport.authenticate('local', function (err, user, info) {
        var token;
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "user": user
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports.register = function (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.username = req.body.username;
    user.nom = req.body.nom;
    user.prenom = req.body.prenom;
    user.Sexe = req.body.Sexe;
    user.date_naissance = req.body.date_naissance;
    user.adresse = req.body.adresse;
    user.phone = req.body.phone;
    user.salaire = req.body.salaire;
    user.rib = req.body.rib;
    user.age = req.body.age;
    user.nbJourConge = req.body.nbJourConge;
    user.role = req.body.role;
    user.poste = req.body.poste;
    user.visible = 1;


    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

