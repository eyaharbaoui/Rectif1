const mongoose = require('mongoose');

let Dossier  = mongoose.model('Dossier');

// Create and Save a new Contrat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Cv) {   //controle de saisie
        res.status(400).send({ message: "Content can not be empty!" });
        return; // twakef l programme
    }
    // Create a Rarety
    const dossier = new Dossier({
        Cv: req.body.Cv,
        Autre: req.body.Autre,
        Description: req.body.Description
        // Dossier: req.body.Dossier,



    });
    // Save Tutorial in the database
    dossier.save(dossier)
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


// Retrieve all contarts from the databas. afficher tous
exports.findAll = (req, res) => {
    Dossier.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Dossiers."
            });
        });
};
// Find a single Dossier with an id

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Dossier.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Dossier with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Dossier with id=" + id});
        });
};
// Update a Dossier by the id in the request

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;


    Dossier.findOne({}, function (err, dossier) {
            // Return if Dossier not found in database
            if (!dossier) {
                res.status(401);
                res.json("dossier not found !");

                // Return if password is wrong

            } else {

                Dossier.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update Dossier with id=${id}. Maybe Dossier was not found!`
                            });
                        } else res.json("new Dossier updated !");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Dossier with id=" + id
                        });
                    });
            }
        }
    );
}

// Delete a Dossier with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
    Dossier.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Dossier with id=${id}. Maybe Dossier was not found!`
                });
            } else {
                res.send({
                    message: "Dossier was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Dossier with id=" + id
            });
        });
};
// Delete all Dossier from the database.
exports.deleteAll = (req, res) => {
    Dossier.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Dossiers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Dossiers."
            });
        });
};
