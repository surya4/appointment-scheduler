let express = require('express');
let Index = require('../controllers/index');
let Schedule = require('../controllers/schedule');
let router = express.Router();

router.get('/', Index.index_get);
router.post('/appointments', Index.index_post);

router.get('/appointments', Schedule.appoint_get);
router.post('/schedule', Schedule.appoint_post);

module.exports = router;