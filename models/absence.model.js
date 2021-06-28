const mongoose = require('mongoose');
const express = require('express')

const Schema = mongoose.Schema;

let Absence = new Schema({
    motif: {
        type: String
    },
    nb_heure: {
        type: Number
    },
    date: {
        type: Date
    },
    etat: {
        type: String,
        enum: ['En attente', 'Approuvé', 'Non approuvé'],
        default: 'Approuvé'
    },


}, {
    collection: 'absences',
    timestamps: true
})


module.exports = mongoose.model('Absence', Absence);