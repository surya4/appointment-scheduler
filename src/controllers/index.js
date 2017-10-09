const express = require('express');
let users = require('../../config/users.json');

/* GET home page. */
exports.index_get = (req, res) => {
    try {
        res.render('pages/index', {
            title: 'Appointment Scheduler'
        });
    } catch (e) {
        console.log("Error : " + e);
        return next(e);
    }
};

exports.index_post = (req, res, next) => {
    let message,
        pos,
        loginAllow = false;
    for (var i = 0; i < users.data.length; i++) {
        if (users.data[i].name === req.body.Username &&
            users.data[i].password === req.body.password) {
            pos = i;
            loginAllow = true;
            break;
        } else {
            message = 'In correct Credentials';
        }
    }
    try {
        if (loginAllow) {
            res.render('pages/appointments', {
                data: users.data,
                user: users.data[i].name,
                timezone: users.data[i].timezone
            });
        } else {
            res.send(message);
        }
    } catch (e) {
        console.log("Error : " + e);
        return next(e)
    }

};