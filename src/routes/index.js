const express = require('express');
const Index = require('../controllers/index');
const router = express.Router();

router.get('/', Index.index_get);
router.post('/', Index.index_post);
router.get('/logout', Index.logout);
module.exports = router;