const mongoose = require('mongoose');

let Absence = mongoose.model('Absence');

// Create and Save a new absence
exports.create = (req, res) => {
    // Validate request : controle de sasie
    //error 400 : erreur client , 500 serveur , 200 succes
    if (!req.body.motif) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    // Create a absence
    const absence = new Absence({
        motif: req.body.motif,
        nb_heure: req.body.nb_heure,
        date: req.body.date
        //   etat : req.body.etat

    });
    // Save Tutorial in the database
    absence.save(absence)
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

// Retrieve all absences from the database.
exports.findAll = (req, res) => {
    Absence.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving absences."
            });
        });
};
// Find a single absence with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Absence.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found absence with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving absence with id=" + id});
        });
};
// Update a absence by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Absence.findOne({}, function (err, absence) {
            // Return if absence not found in database
            if (!absence) {
                res.status(401);
                res.json("absence not found !");
            } else {

                Absence.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update absence with id=${id}. Maybe absence was not found!`
                            });
                        } else res.json("new absence updated !");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating absence with id=" + id
                        });
                    });
            }
        }
    );
}

// Delete a absence with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Absence.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete absence with id=${id}. Maybe absence was not found!`
                });
            } else {
                res.send({
                    message: "absence was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete absence with id=" + id
            });
        });
};
// Delete all absence from the database.
exports.deleteAll = (req, res) => {
    Absence.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} absences were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all absences."
            });
        });
};