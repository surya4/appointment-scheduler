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
    try {
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
        // console.log(req.body.Username);
        // console.log(users.data[pos]);
        if (loginAllow) {
            res.render('pages/appointments', {
                data: users.data,
                user: users.data[pos].name,
                pos: pos
            });
        } else {
            res.send(message);
        }
    } catch (e) {
        console.log("Error : " + e);
        return next(e)
    }

};