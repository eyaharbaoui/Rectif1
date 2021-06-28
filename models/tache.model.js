const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tache = new Schema({
    description: {
        type: String
    },
    date_debut: {
        type: Date
    },
    date_fin: {
        type: Date
    },

    etat: {
        type: String,
        enum: ['en cours', 'terminé', 'annulé', 'deadline dépasseé', 'terminé après deadline'],
        default: 'en cours'

    }

}, {
    collection: 'taches',
    timestamps: true
})


module.exports = mongoose.model('Tache', Tache);