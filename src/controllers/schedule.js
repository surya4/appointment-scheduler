const path = require('path');
let fs = require('fs');
let jsonFile = path.join(__dirname, "../../config/users.json");
let users = require("../../config/users.json");


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
            console.log(jsonData);
            jsonData.data[pos].schedules.push(req.body.calendar);
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