const mongoose = require('mongoose');

let Tache = mongoose.model('Tache');

//Create and save new tache
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create Tache
    const tache = new Tache({
       description: req.body.description,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        etat:req.body.etat


    });
    // Save Tache in the database
    tache.save(tache)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the tache."
            });
        });
};


// Retrieve all tasks from the database.
exports.findAll = (req, res) => {
    Tache.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving taches."
            });
        });
};
// Find a single task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Tache.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found tache with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving tache with id=" + id});
        });
};
// Update a tache by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Tache.findOne({}, function (err, tache) {
            // Return if task not found in database
            if (!tache) {
                res.status(401);
                res.json("task not found !");
            }

            else {
                Tache.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update tache with id=${id}. Maybe tache was not found!`
                            });
                        } else res.json("new task updated !");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating tache with id=" + id
                        });
                    });
            }
        }
    );
}

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
   Tache.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete task with id=${id}. Maybe tache was not found!`
                });
            } else {
                res.send({
                    message: "Task was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete tache with id=" + id
            });
        });
};
// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
   Tache.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tasks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        });
};