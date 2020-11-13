const { authSecret } = require('./.env')

module.exports = app => {
    return function(req, res, nx) {
        if (req.headers.authorization != authSecret) res.status(401).send('Unauthorized')
        nx()
    }
}