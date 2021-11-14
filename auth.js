const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: process.env.JWKS_URI
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key){
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

function verifyUser(request, errOrUserCallback) {
    try {
        const token = request.headers.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token, getKey, {}, errOrUserCallback);
    } catch(error) {
        errOrUserCallback('not authorized');
    }
}

module.exports = verifyUser;