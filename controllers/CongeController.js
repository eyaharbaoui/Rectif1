const mongoose = require('mongoose');

let Conge = mongoose.model('Conge');

// Create and Save a new Conge
exports.create = (req, res) => {
    // Validate request : controle de sasie
    //error 400 : erreur client , 500 serveur , 200 succes
    if (!req.body.motif) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a Conge
    const conge = new Conge({
        motif: req.body.motif,
        nb_heure: req.body.nb_heure,
        date_d: req.body.date_d,
        date_f: req.body.date_f,
        justificatif: req.body.justificatif

        //   etat : req.body.etat

    });
    // Save Tutorial in the database
    conge.save(conge)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the rarety."
            });
        });
};

// Retrieve all Conges from the database.
exports.findAll = (req, res) => {
    Conge.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Conges."
            });
        });
};
// Find a single Conge with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Conge.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Conge with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Conge with id=" + id});
        });
};
// Update a Conge by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Conge.findOne({}, function (err, conge) {
            // Return if Conge not found in database
            if (!conge) {
                res.status(401);
                res.json("Conge not found !");
            } else {

                Conge.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update Conge with id=${id}. Maybe Conge was not found!`
                            });
                        } else res.json("new Conge updated !");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Conge with id=" + id
                        });
                    });
            }
        }
    );
}

// Delete a Conge with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Conge.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Conge with id=${id}. Maybe Conge was not found!`
                });
            } else {
                res.send({
                    message: "Conge was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Conge with id=" + id
            });
        });
};
// Delete all Conge from the database.
exports.deleteAll = (req, res) => {
    Conge.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Conges were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Conges."
            });
        });
};