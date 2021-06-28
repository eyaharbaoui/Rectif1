const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
// Define collection and schema

let User = new Schema({
    username: {
        type: String
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    nom: {
        type: String
    },
    Sexe: {
        type: String,
        enum: ['Homme', 'Femme'],
        default: 'Homme'
    },
    prenom: {
        type: String
    },
    date_naissance: {
        type: Date
    },
    email: {
        type: String
    },
    adresse: {
        type: String
    },
    phone: {
        type: String
    },
    salaire: {
        type: Number
    },
    rib: {
        type: String
    },
    age: {
        type: Number
    },
    visible: {
        type: Number,
        default: '1'
    },
    nbJourConge: {
        type: Number,
        default: '0'
    },
    role: {
        type: String,
        enum: ['collaborateur', 'RH Manager', 'RH', 'Manager', 'superAdmin'],
        default: 'superAdmin'
    },
    poste: {
        type: String,
        enum: ['ingénieur', 'comptable', "technicien"],
        default: 'technicien'
    },
    dossier: {type: Schema.Types.ObjectId, ref: 'Dossier'},
    taches: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tache'
        }],
    },
    conges: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Conge'
        }],
    },
    absences: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Absence'
        }],
    },
    contrat: {type: Schema.Types.ObjectId, ref: 'Contrat'},


}, {
    collection: 'users',
    timestamps: true
})

User.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
User.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
User.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.user_email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


module.exports = mongoose.model('User', User);

