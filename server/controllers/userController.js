const mongoose = require('mongoose');

let User = mongoose.model('User');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request

    if (!req.body.username) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a User
    const user = new User({
        username: req.body.username,
        age: req.body.age
    });

    // Save User in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found User with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving User with id=" + id});
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    var user = new User();
    const id = req.params.id;
    var oldpassword = req.body.oldpassword;
    var newpassword = req.body.newpassword;
    console.log(oldpassword);
    console.log(newpassword);


    User.findOne({}, function (err, user) {

            // Return if user not found in database
            if (!user) {
                res.status(401);
                res.json("user not found !");
            }

            // Return if password is wrong
            else if (!user.validPassword(oldpassword)) {
                res.status(401);
                res.json("old password is not correct !");
            } else {
                user.setPassword(newpassword);
                req.body.hash = user.hash;
                req.body.salt = user.salt;
                User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update User with id=${id}. Maybe User was not found!`
                            });
                        } else res.json("new password updated !");
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

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};





