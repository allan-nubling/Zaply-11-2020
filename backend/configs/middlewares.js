const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

module.exports = app => {
    app.use(cors())
    app.use(bodyParser.json())
}