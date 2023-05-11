const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const EnumServerDefinitions = require('../common/enums/enum_server_definitions');
const EnumMessage = require('../common/enums/enum_message');
const SystemConst = require('../common/consts/system_const')

const secretToken = process.env.ACCESS_TOKEN_SECRET;
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers[EnumServerDefinitions.AUTHORIZATION];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            throw new Error(EnumMessage.TOKEN_NOT_PROVIDE); // Ném một lỗi nếu token không được cung cấp
        }
        jwt.verify(token, secretToken, (err, user) => {
            if (err) {
              throw new Error(EnumMessage.TOKEN_NOT_INVALID); // Ném một lỗi nếu token không hợp lệ
            }
            req.user = user;
            next();
        });
    } catch (error) {
        logger.error(error);
        return res.status(SystemConst.UNAUTHORIZED_REQUEST).json({ result_message: error.message });
    }
}

module.exports = authenticateToken;