const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define collection and Schema
//def atrr
//op
let Dossier  = new Schema({

    Cv:{
        type: String
    },
    Autre:{
        type: String
    },
    Description:{
        type: String
    },


},{
    collection: 'Dossiers' ,
    timestamps:true  //wakt creation modification
})
//modele nhathrulou sxhema - lees enregistremebt mawjoud f dosiier collection fihn les enre conforme lle schjema


module.exports = mongoose.model('Dossier',Dossier);   //kil conclusion
