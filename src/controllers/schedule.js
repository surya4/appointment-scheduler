let users = require('../../config/users.json');

exports.appoint_post = (req, res, next) => {
    for (var i = 0; i < users.length; i++) {
        var element = array[i];

    }

    try {
        console.log(time.calendar);
    } catch (e) {
        console.log("Error : " + e);
        return next(e)
    }

};