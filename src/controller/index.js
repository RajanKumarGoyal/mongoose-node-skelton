const user = require("./user.controller");

module.exports = {
    userCreate: user.register,
    userLogin: user.login,
    editProfile: user.editProfile,
    updatePassword: user.updatePassword,
    forgetPassword: user.forgetPassword,
    resetPassword: user.resetPassword,
};
