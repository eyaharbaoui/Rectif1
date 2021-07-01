const mongoose = require('mongoose');
const express = require('express')

const Schema = mongoose.Schema;

let Conge = new Schema({
    motif: {
        type: String
    },
    justificatif: {
        type: String
    },
    date_d: {
        type: Date
    },
    date_f: {
        type: Date
    },
    etat: {
        type: String,
        enum: ['En attente', 'Approuvé', 'Non approuvé'],
        default: 'Approuvé'
    },
    paiement:{
        type: Number,
        default: 0
    }


}, {
    collection: 'conges',
    timestamps: true
})


module.exports = mongoose.model('Conge', Conge);
