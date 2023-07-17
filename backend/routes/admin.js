const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const upload = require('../Controllers/multer/multer');

router.post('/refresh', adminController.refreshToken);
router.get('/', adminController.authenticateUser);
router.post('/addcategory', upload.single('image'), adminController.addCategory);
router.get('/category', adminController.authenticateToken, adminController.getAllCategories);
router.delete('/category', adminController.authenticateToken,adminController.deleteCategory);
router.post('/editCategory', upload.single('image'), adminController.editCategory);
router.get('/getuser',adminController.authenticateToken, adminController.getAllUsers);
router.get('/block', adminController.authenticateToken,adminController.blockUser);
router.get('/getAllPropertyList',adminController.authenticateToken, adminController.getAllPropertyList);
router.get('/getAllHostdetail',adminController.authenticateToken, adminController.getAllHostDetails);
router.post('/getAHostdetail',adminController.authenticateToken, adminController.getAHostDetail);
router.post('/verifyHostdetail', adminController.authenticateToken,adminController.verifyHostdetail);
router.get('/getallorder',adminController.getallOrders)
router.get('/dashboard',adminController.getallDashboard)
router.patch('/Cancelbooking/:hostid/:orderprice/:orderid',adminController.CancelBooking)

router.delete('/removeProperty/:id',adminController.authenticateToken, adminController.deleteProperty);

// router.get('/dout', adminController.dout);

module.exports = router;
