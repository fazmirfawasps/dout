// routes/index.js

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const upload = require('../Controllers/multer/multer');
const bookingHelpers = require('../Model/bookingHelpers');


// GET /
router.get('/', userController.getIndex);
router.post('/refresh', userController.refresh);


// POST /updateUser
router.post('/updateUser', userController.postUpdateUser);

// POST /checkMobNo
router.post('/checkMobNo', userController.postCheckMobNo);

// GET /getAllproperty
router.get('/getAllproperty', userController.getAllProperty);

// DELETE /removeProperty/:id
router.delete('/removeProperty/:id',userController.authenticateToken, userController.deleteProperty);
// Handle POST /hostdetails
router.post('/hostdetails', upload.single('image'), userController.hostdetails);

// Handle POST /create-checkout-session
router.post('/create-checkout-session',userController.authenticateToken, userController.createCheckoutSession);

// Handle POST /placeOrder
router.post('/placeOrder',userController.authenticateToken, userController.placeOrder);

router.get('/getauserdetail/:id',userController.authenticateToken, userController.getUserDetail
)

router.get("/viewOrders/:id",userController.authenticateToken, (req, res) => {

  
  try {
    bookingHelpers.getOrders(req.params.id).then((orders)=>{
      res.status(200).json(orders);

    })
  } catch (err) {
    res.status(500).send(err);
  }

});
router.post("/addtowishlist", userController.managewishlist);

router.post("/removeWishlist/:userid/:wishlistid", userController.removeFromWishlist);
router.get("/getWishlist/:userid",userController.authenticateToken,userController.getWishlist);
router.patch("/Cancelbooking/:orderid",userController.authenticateToken,userController.CancelBooking);
router.post("/addconversation",userController.authenticateToken, userController.addConverstaion);
router.get("/getConversation/:userid", userController.authenticateToken,userController.getConversation);
router.post("/addmessages", userController.addMessages);
router.get("/getMessages/:conversationid", userController.getMessage);
router.post('/editProfile',userController.authenticateToken,userController.editProfile)


module.exports = router;
