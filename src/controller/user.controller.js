/**
 * Module dependencies.
 */
const mongoose = require("mongoose");
const users = mongoose.model("users");
const bcrypt = require("bcrypt");
const httpStatus = require("../helpers/httpStatus.helper");
const { sendEmail, sendTokenToMail } = require("../email/emailService");
const { JWT_SECRET } = require("../constant");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {

    try {

        const { email, username, password } = req.body;
        const usernameCheck = await users.findOne({ username });

        if (usernameCheck) {
            return httpStatus.sendError409("Username already used", res);
        }

        const emailCheck = await users.findOne({ email });
        if (emailCheck) {
            return httpStatus.sendError409("Email already used", res);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({ email, username, password: hashedPassword });

        delete user.password;
        res.user = user;

        const mailContent = { email: user.email, name: user.username };

        sendEmail(mailContent);
        next();

    } catch (err) {

        return httpStatus.sendError400(err.message, res);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const checkUser = await users.findOne({ email });
        if (!checkUser) {
            return httpStatus.sendError404("Invalid Email Address", res);
        } else {
            const checkPassword = bcrypt.compareSync(password, checkUser.password);
            if (checkPassword === false) {
                return httpStatus.sendError404("Incorrect Password! Please try again.", res);
            }
            res.user = checkUser;
            next();
        }
    } catch (err) {
        return httpStatus.sendError400(err.message, res);
    }
};

const editProfile = async (req, res, next) => {

    try {

        const username = req.body.newname;
        await users.updateOne({ _id: res.userId }, { $set: { username: username } });
        const updatedUser = await users.findOne({ _id: res.userId });

        res.user = updatedUser;
        next();

    } catch (err) {

        return httpStatus.sendError400(err.message, res);
    }
};

const updatePassword = async (req, res) => {

    try {

        const { oldpassword, password } = req.body;
        const checkUser = await users.findOne({ _id: res.userId });
        const checkPassword = bcrypt.compareSync(oldpassword, checkUser.password);

        if (checkPassword === true) {

            if (oldpassword !== password) {

                const hashedPassword = await bcrypt.hash(password, 10);
                await users.updateOne({ _id: res.userId }, { $set: { password: hashedPassword } });

                return httpStatus.sendResp200("Password Updated", res);

            } else {

                return httpStatus.sendError409("Both Password should not be same", res);
            }

        } else {

            return httpStatus.sendError404("Old Password is Incorrect", res);
        }

    } catch (err) {

        return httpStatus.sendError400(err.message, res);
    }
};

const forgetPassword = async (req, res) => {

    try {

        const { email } = req.body;
        const oldUser = await users.findOne({ email: email });

        if (oldUser) {
            sendTokenToMail({ name: oldUser.username, email: oldUser.email, _id: oldUser._id, password: oldUser.password });
        } else {
            return httpStatus.sendError404("This Email is not registered with us", res);
        }

        return httpStatus.sendResp200("Please check your mail. ", res);

    } catch (err) {

        return httpStatus.sendError400(err.message, res);
    }
};

const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { newPassword, confirmNewPassword } = req.body;

        const secret = JWT_SECRET;

        const verify = jwt.verify(token, secret);
        const oldUser = await users.findOne({ _id: verify.id });
        const checkPassword = bcrypt.compareSync(newPassword, verify.password);

        if (!oldUser) {
            return httpStatus.sendError404("User does not exist", res);
        } else if (checkPassword === true) {
            return httpStatus.sendError409("Old Password and New Password should not be  same", res);
        } else if (newPassword !== confirmNewPassword) {
            return httpStatus.sendError404("New Password should match with Confirm New Password", res);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await users.updateOne({ _id: verify.id }, { $set: { password: hashedPassword } });
        return httpStatus.sendResp200("Password reset successfully", res);

    } catch (err) {

        return httpStatus.sendError400(err.message, res);
    }
};

module.exports = {
    register,
    login,
    editProfile,
    updatePassword,
    forgetPassword,
    resetPassword,
};
