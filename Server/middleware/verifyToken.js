const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const { User } = require('../models').models;

const CheckTokenStatus = {
	TOKEN_MISMATCH: 0,
}

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) 
        return res.status(401).json({
            message: 'Unauthorized'
        });
    
    const authText = req.headers.authorization.split(' ');

    if (0 >= authText.length || 'Bearer' !== authText[0])
        return res.status(401).json({
            message: 'Unauthorized'
        });

    const token = authText[1];

    jwt.verify(token, JWT_SECRET_KEY, async function (err, user) {
        if (err) {
            return res.status(403).json({
                message: err.message
            });
        }

        try {
            const status = await checkToken(token);

            if (CheckTokenStatus.TOKEN_MISMATCH === status) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Unauthorized',
                });
            }

            req.user = user;

            return next();
        } catch (err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).json({ 
                    status: 'error',
                    message: 'Service unavailable'
                })
            }

            return res.status(500).json({ 
                status: 'error',
                message: 'Server error. Something went wrong',
            })
        }
    });
}

const checkToken = async (token) => {
  	const user = await User.findOne({
		where: {
			token: token,
		},
	});

	if (!user) return CheckTokenStatus.TOKEN_MISMATCH;

	return user;
};
