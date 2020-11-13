const app = require('express')()
const consign = require('consign')
const express = require('express')

//Env. variable for DB
const db = require('./configs/database')
app.db = db


app.use(express.static('./public', { extensions: ['html'] }))
//Script to load models
consign()
    .include('./configs/middlewares.js')
    .then('./configs/passport.js')
    .then('./utils')
    .then('./models')
    .then('./configs/routes.js')
    .into(app)


//Conf to run on Google APP Engine    
const port = process.env.PORT || 3031;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});