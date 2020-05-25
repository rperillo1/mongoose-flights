var express = require('express');
var router = express.Router();
const destinationsCtrl = require('../controllers/destinations')

router.post('/flights/:id', destinationsCtrl.create);
router.delete('/flights/:id/destinations', destinationsCtrl.delete);



module.exports = router;