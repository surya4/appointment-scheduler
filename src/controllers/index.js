const express = require('express');
let users = require('../../config/users.json')

/* GET home page. */
exports.index_get = (req, res, next) => {
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
    let name = req.body;

    console.log(name);
    try {
        res.render('pages/appointments');
    } catch (e) {
        console.log("Error : " + e);
        return next(e);
    }
};