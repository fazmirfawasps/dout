const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const hostController = require('../Controllers/hostController');
const upload = require ('../Controllers/multer/multer');

router.post('/addproperty', upload.array('images'), hostController.addProperty);
router.get('/getvehicleType', adminController.getVehicleType);
router.post('/getHostedproperty', hostController.getHostedProperty);
router.post('/EditHostedproperty', upload.array('images'), hostController.editHostedProperty);

module.exports = router;
