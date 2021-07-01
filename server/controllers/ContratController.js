const mongoose = require('mongoose');

let Contrat = mongoose.model('Contrat');

// Create and Save a new Contrat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.NomContrat) {
        res.status(400).send({message: "Content can not be empty!"});
        return; // twakef l programme
    }
    // Create a Rarety
    const contrat = new Contrat({
        NomContrat: req.body.NomContrat,
        Datedebut: req.body.Datedebut,
        Datefin: req.body.Datefin
        // Contrat: req.body.Contrat,


    });
    // Save Tutorial in the database
    contrat.save(contrat)
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
    Contrat.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Contrats."
            });
        });
};
// Find a single Contrat with an id

exports.findOne = (req, res) => {
    const id = req.params.id;  //body matarwouch fl url / params trah fl url
    console.log(id);
    Contrat.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Contrat with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Contrat with id=" + id});
        });
};
// Update a Contrat by the id in the request

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;


    Contrat.findOne({}, function (err, contrat) {
            // Return if Contrat not found in database
            if (!contrat) {
                res.status(401);
                res.json("contrat not found !");

                // Return if password is wrong

            } else {

                Contrat.findByIdAndUpdate(id, req.body, {useFindAndModify: false}) //ou bien f [{}] req body
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update Contrat with id=${id}. Maybe Contrat was not found!`
                            });
                        } else res.json("new Contrat updated !");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Contrat with id=" + id
                        });
                    });
            }
        }
    );
}

// Delete a Contrat with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
    Contrat.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Contrat with id=${id}. Maybe Contrat was not found!`
                });
            } else {
                res.send({
                    message: "Contrat was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contrat with id=" + id
            });
        });
};
// Delete all Contrat from the database.
exports.deleteAll = (req, res) => {
    Contrat.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Contrats were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Contrats."
            });
        });
};
