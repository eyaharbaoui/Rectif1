const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Equipe = new Schema({
    nom: {
        type: String
    },
    nb_membre: {
        type: Number
    },
    users: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    }

}, {
    collection: 'equipes',
    timestamps: true
})


module.exports = mongoose.model('Equipe', Equipe);