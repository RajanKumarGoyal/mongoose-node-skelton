"use strict";

const controller = require("../controller");
const jwt = require("../middleware/jwt.validator");
const validator = require("../middleware/schema.validator");
const { userLogin, userRG } = require("../helpers/validator.helper");

module.exports = (app) => {

    app.route("/create/users").post(validator(userRG), controller.userCreate, jwt.encode);
    app.route("/login/users").put(validator(userLogin), controller.userLogin, jwt.encode);

    app.route("/forget/password").put(controller.forgetPassword);
    app.route("/reset/password/:token").put(controller.resetPassword);

    app.route("/edit/profile").put(jwt.decode, controller.editProfile, jwt.encode);
    app.route("/update/password").put(jwt.decode, controller.updatePassword);
};
