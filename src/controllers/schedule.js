const path = require('path');
let fs = require('fs');
const moment = require('moment-timezone');
let jsonFile = path.join(__dirname, "../../config/users.json");
let users = require("../../config/users.json");
let times = require("../../config/timezone.json");
let timezone_name,
    ap_time;


exports.appoint_get = (req, res, next) => {
    try {

        res.render('pages/appointments', {
            title: 'Appointment Scheduler',

        });
    } catch (e) {
        console.log("Error : " + e);
        return next(e);
    }
}


exports.appoint_post = (req, res, next) => {
    let inp = req.body,
        pos;
    try {
        for (var i = 0; i < users.data.length; i++) {
            if (users.data[i].name === req.body.scheduleto) {
                pos = i;
                break;
            }
        }
        let jsonData;
        fs.readFile(jsonFile, 'utf8', function(err, data) {
            if (err) throw err;
            jsonData = JSON.parse(data);
            //    console.log(jsonData);

            for (var i = 0; i < times.list.length; i++) {
                if (times.list[i].text === users.data[pos].timezone) {
                    timezone_name = times.list[i].name;
                    break;
                }
            }
            // time formatting 
            ap_time = moment(req.body.calendar).tz(timezone_name).format('LLLL');
            console.log(ap_time);
            jsonData.data[pos].schedules.push(ap_time);
            fs.writeFile(jsonFile, JSON.stringify(jsonData), function(err) {
                if (err) throw err;
                console.log('complete');
            });
        });
        res.send("Done");
    } catch (e) {
        console.log("Error : " + e);
        return next(e)
    }

};