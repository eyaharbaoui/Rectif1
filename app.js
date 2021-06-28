// initiate express
const express = require('express');
// initiate mongoose
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
var passport = require('passport');

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


//models
require("./models/user.model");
require('./models/equipe.model');
require('./models/tache.model');
require('./models/Contrat.model');
require('./models/Dossier.model');
require('./models/absence.model')
require('./models/conge.model')

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
