const {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    decodeToken,
    jwtConfig
} = require('../config/jwt');

module.exports.generateToken = generateToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.verifyToken = verifyToken;
module.exports.verifyRefreshToken = verifyRefreshToken;
module.exports.decodeToken = decodeToken;
module.exports.jwtConfig = jwtConfig;
module.exports.default = generateToken;
