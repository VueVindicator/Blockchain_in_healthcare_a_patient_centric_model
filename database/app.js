const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');
 
const app = express();

const MONGODBURI = 'mongodb+srv://davetech:0JcSyzCDJFTrtqWl@cluster0-aq6mn.mongodb.net/medblock';

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors())
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    next();
})

app.use(express.static(path.join(__dirname, './public')));

const authRoutes = require('./routes/auth');
// const noAuthRoutes = require('./routes/noAuthRoutes');
const appRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);
// app.use(noAuthRoutes);
app.use(appRoutes);

mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(8000)
        console.log('Listening');
    })
    .catch(err => console.log(err));