const mongoose = require('mongoose');

let Equipe = mongoose.model('Equipe');

//Create and save equipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create equipe
    const equipe = new Equipe({
        nom: req.body.nom,
        chef_equipe : req.body.chef_equipe,
        nb_membre: req.body.nb_membre

    });
    // Save equipe in the database
    equipe.save(equipe)
        .then(data => {
            res.send({
                message: "Post added successfully",
                equipeId: data._id
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating equipe."
            });
        });
};


// Retrieve all equipes from the database.
exports.findAll = (req, res) => {
    Equipe.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving equipes."
            });
        });
};
// Find a single equipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Equipe.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found equipe with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving equipe with id=" + id});
        });
};
// Update a equipe by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Equipe.findOne({}, function (err, equipe) {
            // Return if equipe not found in database
            if (!Equipe) {
                res.status(401);
                res.json("Equipe not found !");
            }

            else {
                Equipe.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update equipe with id=${id}. Maybe equipe was not found!`
                            });
                        } else res.json("equipe updated !");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating User with id=" + id
                        });
                    });
            }
        }
    );
}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Equipe.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete equipe with id=${id}. Maybe equipe was not found!`
                });
            } else {
                res.send({
                    message: "equipe was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete equipe with id=" + id
            });
        });
};
// Delete all equipe from the database.
exports.deleteAll = (req, res) => {
    Equipe.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} equipes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all equipes."
            });
        });
};