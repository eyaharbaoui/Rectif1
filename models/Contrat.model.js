const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contrat = new Schema({

    NomContrat: {
        type: String
    },
    Datedebut: {
        type: Date
    },
    Datefin: {
        type: Date
    },
    Type: {
        type: String,
        enum: ['CDI', 'CDD', 'CTT', 'SIVP'],
        default: 'CDI'
    },


}, {
    collection: 'Contrats',
    timestamps: true
})


module.exports = mongoose.model('Contrat', Contrat);
