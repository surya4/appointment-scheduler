let express = require('express');
let Index = require('../controllers/index');
let router = express.Router();

router.get('/', Index.index_get);
router.post('/appointments', Index.index_post);

module.exports = router;