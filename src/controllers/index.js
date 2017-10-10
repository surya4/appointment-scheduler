const express = require('express');
const users = require('../models/users.json');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
let times = require("../models/timezone.json");

/* GET home page. */
exports.index_get = (req, res) => {
    if (req.session.is_logged_in) {
        let user_data = get_user_data_file(req.session.user);
        console.log("user is already logged in");
        let user_list = getAllUsers(req.session.user);
        res.render('pages/appointments', {
            schedules: user_data.schedules,
            timezone: req.session.timezone,
            users: user_list
        });
        return;
    } else {
        console.log("user is not logged in");
        res.render('pages/index', {
            message: "Enter valid username and password"
        });
    }
};

exports.index_post = (req, res) => {
    if (req.session != undefined && req.session.is_logged_in) {
        var calendar = req.body['calendar'];
        var note = req.body['note'];
        var schedulewith = req.body['schedulewith'];

        // convert timezone from creator time zone to other user's time zone
        let other_user_timezone_name = getTimeZoneName(users[schedulewith]);
        appointement_for_other_user = {
            time: moment(calendar).tz(other_user_timezone_name).format('LLLL'),
            short_note: note,
            scheduled_with: req.session.user
        }

        let other_user_data = get_user_data_file(schedulewith);
        console.log("other_user_data - " + other_user_data);
        other_user_data.schedules.push(appointement_for_other_user);
        save_user_data_file(schedulewith, other_user_data);

        // convert timezone to user's time zone
        let curr_user_timezone_name = getTimeZoneName(users[req.session.user]);
        appointement_for_curr_user = {
            time: moment(calendar).tz(curr_user_timezone_name).format('LLLL'),
            short_note: note,
            scheduled_with: schedulewith
        }

        let curr_user_data = get_user_data_file(req.session.user);
        console.log("curr_user_data - " + curr_user_data)
        curr_user_data.schedules.push(appointement_for_curr_user);
        save_user_data_file(req.session.user, curr_user_data);
    } else {
        // login form request
        console.log("login form request");
        let user = req.body['Username'];
        let password = req.body['password'];
        if (user == undefined ||
            user.trim() == "" ||
            password == undefined ||
            password.trim() == "") {
            console.log("invalid login request");
            res.render('pages/index', {
                message: "Invalid request"
            });
            return;
        }
        // validate form data for null or empty value-> redirect to index page with message
        let user_info = users[user];
        if (user_info == undefined || user_info.password != password) {
            console.log("login failed");
            res.render('pages/index', {
                message: "Invalid username/password"
            });
            return;
        }
        console.log("login success");

        req.session.user = user;
        req.session.is_logged_in = true;
        req.session.timezone = user_info.timezone;
    }
    res.redirect("/");
};

// common function to get data from json file
function get_user_data_file(user) {
    file_name = user + "_data_file.json";
    let jsonFile = path.join(__dirname, "../models/" + file_name);
    console.log("get json file" + jsonFile);
    let user_data = undefined;
    // check if file is exits
    if (fs.existsSync(jsonFile)) {
        // read user data json file 
        user_data = JSON.parse(fs.readFileSync(jsonFile));
        console.log("read user data: " + user_data);
    } else {
        user_data = {
            "user": user,
            "schedules": []
        }
        save_user_data_file(user, user_data);
    }

    console.log("returning data file" + user_data);

    return user_data;
}

function save_user_data_file(user, data) {
    // console.log(data);
    file_name = user + "_data_file.json";
    let jsonFile = path.join(__dirname, "../models/" + file_name);
    console.log("get json file" + jsonFile);

    // write json file
    fs.writeFileSync(jsonFile, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
    });
};


// get list of other users to select in drop down and create appointment
function getAllUsers(user) {
    var other_users = [];
    for (var k in users) {
        if (k != user)
            other_users.push(k);
    }
    console.log("other_users - > " + other_users.length);
    return other_users;
}

// convert timezones e.g. from Eastern Standard Time (-5:00 GMT) to US/Eastern for moment
function getTimeZoneName(user) {
    console.log(times[user.timezone]);
    return times[user.timezone];
}