const jwt = require('jsonwebtoken');
const response = require('./response')


module.exports = {
    generateToken: async(payload) => {
        var token = await jwt.sign(payload, process.env.SECRET_KEY);
        return token
    },
    verifyToken: async(req, res, next) => {
        try {
            let authorization = req.headers["authorization"];

            if (!authorization) {
                return response.notAllowed(res, 'No token provide')
            }
            let token = authorization.split(" ")[1];
            if (!token) response.notAllowed(res, 'No token provide');
            let userDataVerify = await jwt.verify(token, process.env.SECRET_KEY)
            let userData = await userCheck(userDataVerify.noreg)
            req.user = userData
            req.uuid = v4
            next()
        } catch (error) {
            response.notAllowed(res, 'Token Is Invalid');
        }
    }
}