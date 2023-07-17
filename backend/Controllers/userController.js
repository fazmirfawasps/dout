// routes/controllers/userController.js

const userHelper = require('../Model/userHelper');
const hostHelper = require('../Model/hostHelper');
const stripe = require('stripe')('sk_test_51NHbVVSFTJEFvJs0Typp7VDhjfWWKzKoMHRWjalsTO0Tnmu0B4L5MbImMsNN8RGYqd1o74DvPlxPPz4veut5LPwe00Eg6pgAsi');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('./jwt/jwt')
const getAllBookedDates = require('../Controllers/Logic');
const { Session } = require('express-session');
const BookingHelper =require('../Model/bookingHelpers')
const db =require('../Model/wishListHelper');
const wishListHelper = require('../Model/wishListHelper');
const bookingHelpers = require('../Model/bookingHelpers');
const conversationHelpers =require('../Model/conversationHelper')
const messageHelpers =require('../Model/messageHelper');
const { use } = require('../routes');

// Handle GET / route
exports.getIndex = (req, res, next) => {

    try {
        if (req.query.email) {

            userHelper.addUser(req.query)
                .then((response) => {
             
               const token = this.authenticateUser(response.details[0].Email,response.details[0]._id)
               response.details[0].token = token
                    res.json(response);
                })

                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to add user' });
                });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// handle refresh token
exports.authenticateUser= (user,id)=> {


   
        const accessToken = generateAccessToken(user,id);
        const refreshToken = generateRefreshToken(user,id);

       return({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    
},
exports.refresh = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided.' });
    }

    try {
        const user = verifyToken(refreshToken);
        const accessToken = generateAccessToken(user);

        res.status(200).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token.' });
    }
},
exports .authenticateToken =(req, res, next) =>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);
        if (payload) {
            req.user = payload;
            next();
            return;
        }
    }
    res.sendStatus(401);
},




    // Handle POST /updateUser route
    exports.postUpdateUser = (req, res, next) => {

        userHelper.editUser(req.body)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Failed to update user' });
            });
    };

// Handle POST /checkMobNo route
exports.postCheckMobNo = (req, res, next) => {

    userHelper.checkNum(req.body)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to check mobile number' });
        });
};

// Handle GET /getAllproperty route
exports.getAllProperty = (req, res, next) => {
    userHelper.GetAllProperty()
        .then((response) => {
            const updatedResponse = response.map((item) => {
                const updatedImageFilenames = item.imageFilenames.map((filename) => {
                    return `https://htron.site/api/images/${filename}`;
                });
                return { ...item, imageFilenames: updatedImageFilenames };
            });
            res.status(200).json(updatedResponse);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to get all properties' });
        });
};

// Handle DELETE /removeProperty/:id route
exports.deleteProperty = (req, res, next) => {
    const id = req.params.id;


    userHelper.removeProperty(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to remove property' });
        });
};
// Handle POST /hostdetails
exports.hostdetails = (req, res) => {

    const hostdetails = req.body;
    hostdetails.image = req.file.filename;
    hostdetails.Verified = false;
    hostHelper
        .AddHostdetails(hostdetails)
        .then((response) => {
            res.status(200).json();
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to add host details' });
        });
};
// Handle POST /create-checkout-session
exports.createCheckoutSession = async (req, res) => {

    const {
        _id,
        PropertyName,
        hostid,
        Price,
        Address,
        checkin,
        checkOut,
        userid,
        totalAmount
    } = req.body.property;


    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: PropertyName,
                            description: Address,
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userid: userid,
                propertyId: _id,
                hostid,
                checkin,
                checkOut,
            },
            mode: 'payment',
            success_url: 'http://htron.site/success',
            cancel_url: 'http://htron.site/cancel',
        });
        const sessionData = req.session;

        // Access cookie data
        const cookieData = req.cookies;


        req.session.verifyid = session.id;


        res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};

// Handle POST /placeOrder

exports.placeOrder = async (req, res) => {



    try {
        const updatedSession = await stripe.checkout.sessions.retrieve(req.session.verifyid);
        req.session.verifyid =null
        const { propertyId, checkOut, checkin, hostid, userid } = updatedSession.metadata;

        const document = {
            propertyid: propertyId,
            hostid,
            userid,
            checkin: new Date(checkin),
            checkOut: new Date(checkOut),
            createdAt:new Date(),
            Paymentstatus: updatedSession.payment_status,
            totalprice: updatedSession.amount_total.toString().slice(0, -2),
            OrderStatus: 'Booking pending',
        };

          const unavailableDates = getAllBookedDates(checkin, checkOut);
          userHelper.addUnavailableDates(propertyId, unavailableDates);
        BookingHelper.addBooking(document).then(()=>{

            setTimeout(() => {
                res.sendStatus(200);
              }, 3000);
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to place order' });
    }
};
exports. getUserDetail= (req, res) => {


    userHelper.getauser(req.params.id)
      .then((user) => {
        // Handle the retrieved user details
        res.json(user);
      })
      .catch((error) => {
        // Handle any errors that occurred during the retrieval
        res.status(500).json({ error: 'An error occurred' });
      });}


exports.managewishlist=(req,res)=>{
    try{
  wishListHelper.addWishlist(req.body).then(()=>{
    res.status(200).json('ok')

  })}
    catch(err){
        res.status(500).send(err)
    }
    
}
exports.removeFromWishlist=(req,res)=>{
    try{
        wishListHelper.removeWishlist(req.params).then(()=>{
            res.status(200).json('ok')

        })
    }catch(err){
        res.status(500).send(err)
    }

}

exports.getWishlist=(req,res)=>{
    try{
        wishListHelper.getWishlist(req.params.userid).then((respone)=>{
            res.status(200).json(respone)
        })
    }
    catch(err){
        res.status(500).send(err);
    }
   

}
exports.CancelBooking=async(req,res)=>{
    try{
        bookingHelpers.cancelBooking(req.params.orderid).then(()=>{
            res.status(200).json()
    
        })
    }
    catch(err){
        res.status(500).send(err);

    }
}
exports.addConverstaion = async(req,res)=>{


conversationHelpers.addConversation(req.body).then(()=>{
    res.status(200).send('ok')

})
}
exports.getConversation = async(req,res)=>{

    conversationHelpers.getAllConversation(req.params).then((resp)=>{
        res.status(200).send(resp)
  
    })
}

exports.addMessages = (req,res)=>{

messageHelpers.addMessages(req.body).then((result)=>{
    res.status(200).json(result);

})
}
exports.getMessage=(req,res)=>{
    messageHelpers.getMessages(req.params.conversationid).then((response)=>{
        res.status(200).json(response);

    })
}
exports.editProfile=(req,res)=>{
 
   const data  ={}
   data.FullName=req.body.FullName
   data.MobileNumber=req.body.MobileNumber
   userHelper.editProfile(req.body.id,data).then(()=>{
    res.status(200).json('ok')
   })
   
  }
module.exports = exports;
