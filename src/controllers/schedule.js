exports.appoint_post = (req, res, next) => {
    let time = req.body;
    try {
        console.log(time.calendar);
    } catch (e) {
        console.log("Error : " + e);
        return next(e)
    }

};