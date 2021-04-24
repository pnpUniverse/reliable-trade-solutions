const { sendResponse } = require('../../middleware/requests-helpers');
const { userLogin, userRegister } = require('../../services/authService');

const login = async (req, res, next) => {
    const { body: { email, password } } = req;
    try {
        return sendResponse(
            res,
            await userLogin(email, password)
        );
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    const { body: { email, password } } = req;
    try {
        return sendResponse(
            res,
            await userRegister(req.body)
        );
    } catch (error) {
        next(error);
    }
};

const change_duration = async (req, res, next) => {
    const { params : { duration } } = req;
    try {
        global.duration = Number(duration);
        return sendResponse(
            res,
            await global.duration
        );
    } catch (error) {
        next(error);
    }
};

const get_call_duration = async (req, res, next) => {
    try {
        return sendResponse(
            res,
            await global.duration
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { login, register, change_duration, get_call_duration };