// initiate express
const express = require('express');
// initiate mongoose
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
var passport = require('passport');
const http = require("http");

let bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());



const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));

// parse postman of content-type - application/json
app.use(bodyParser.json());

//database connexion
mongoose.connect('mongodb://localhost:27017/erpRh', {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then((data) => console.log("database connected"))



//models
require("./models/user.model");
const Equipe = require('./models/equipe.model');
require('./models/tache.model');
require('./models/Contrat.model');
require('./models/Dossier.model');
require('./models/absence.model')
require('./models/conge.model')

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PATCH, OPTIONS");

    next();
});

app.post("/api/equipes",(req, res, next )=>{
    const equipe = new Equipe({
        nom: req.body.nom,
        chef_equipe: req.body.chef_equipe,
        nb_membre: req.body.nb_membre
    });

    // console.log(equipe);
    res.status(201).json({
        message: "equipe ajoutée"
    });
});

app.get('/api/equipes',(req, res, next)=>{
    const equipes =[
        // {id:'xcv463', nom:'eya', chef_equipe:'eyaa', nb_membre: 5},
        // {id:'uyjnhbg41', nom:'med', chef_equipe:'medd', nb_membre: 4}

    ];
    res.status(200).json({
        message:'Equipe trouvée ',
        equipes:equipes
    });
});

//router
let userRouter = require('./routes/users');
let equipeRouter = require('./routes/equipes');
let tacheRouter = require('./routes/taches');
let ContratRouter = require('./routes/Contrat');
let DossierRouter = require('./routes/Dossier');
let AbsenceRouter = require('./routes/absences');
let CongeRouter = require('./routes/conges');
let indexRouter = require('./routes/index');


//url routes
require('./config/passport');

app.use('/users', userRouter);
app.use('/equipes', equipeRouter);
app.use('/taches', tacheRouter);
app.use('/contrat', ContratRouter);
app.use('/dossier', DossierRouter);
app.use('/absences', AbsenceRouter);
app.use('/conges', CongeRouter);
app.use('/', indexRouter);



//database connexion
mongoose.connect('mongodb://localhost:27017/erpRh', {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then((data) => console.log("database connected"))
    .catch((err) => console.log(err));


app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});

module.exports = app;
