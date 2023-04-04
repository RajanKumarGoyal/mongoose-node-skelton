const mongoose = require('mongoose');
const { DBNAME } = require('../constant');

module.exports = (app) => {

    mongoose.connect(`mongodb://localhost:27017/${DBNAME}`).then(() => {
        require('./../models/index.js')(mongoose);
        require('./../routes/index.js')(app);
    }).catch((err) => {
        throw (err);
    });
};