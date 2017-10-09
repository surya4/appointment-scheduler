const express = require('express');

/* GET home page. */
exports.index_get = function(req, res) {
    res.render('pages/index', {
        title: 'Appointment Scheduler'
    });
};