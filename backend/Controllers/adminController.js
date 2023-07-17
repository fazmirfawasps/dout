const { verify } = require('jsonwebtoken');
const adminHelpers = require('../Model/adminHelper');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('./jwt/jwt');
const bookingHelpers = require('../Model/bookingHelpers');


const admin = 'fazmir@gmail.com';
const password = 4640;

const adminController = {
    authenticateToken(req, res, next) {
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

    refreshToken(req, res, next) {
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

    authenticateUser(req, res, next) {

        if (req.query.email == admin && req.query.pass == password) {
            const user = req.query;
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else {
            res.status(400).json({ err: 'invalid user' });
        }
    },

    addCategory(req, res, next) {
        const image = `https://htron.site/api/images/${req.file.filename}`;
        adminHelpers.addCategory(req.body.name, image)
            .then((response) => {
                res.status(201).json();
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllCategories(req, res) {
        const url = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
        adminHelpers.findAllCategory()
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    deleteCategory(req, res) {
        adminHelpers.deleteAcategory(req.body.id)
            .then(() => {
                adminHelpers.findAllCategory()
                    .then((response) => {
                        res.json(response);
                    })
                    .catch((error) => {
                        res.status(500).json({ error: 'Internal server error' });
                    });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    editCategory(req, res) {
        const data={
            Category:'',
            image:''
        }
        if( req.body.Category ){
            data.Category = req.body.Category
        }
        else{
            data.Category = req.body.oldname
        }
        if(req.file){
          data.image =  `https://htron.site/api/images/${req.file.filename}`
        }
        else{
          data.image=req.body.old
        }
        adminHelpers.Editcategory(req.body.id, data)
            .then(() => {
                adminHelpers.findAllCategory()
                    .then((response) => {
                        res.json(response);
                    })
                    .catch((error) => {
                        res.status(500).json({ error: 'Internal server error' });
                    });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllUsers(req, res) {
        adminHelpers.getAlluser()
            .then((user) => {
                res.json(user);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    blockUser(req, res) {
        adminHelpers.blockUser(req.query.action, req.query.user)
            .then(() => {
                res.json();
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllPropertyList(req, res) {
        adminHelpers.GetAllProperty()
            .then((property) => {
                res.json(property);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllHostDetails(req, res) {
        adminHelpers.GetAllHostdetail()
            .then((property) => {
                res.json(property);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAHostDetail(req, res) {
        adminHelpers.GetAhostDetail(req.body)
            .then((property) => {
                property[0].image = `https://htron.site/api/images/${property[0].image}`;

                res.json(property);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    },


    verifyHostdetail: (req, res) => {
      
        adminHelpers.verifyHost(req.body).then((response) => {
            res.status(200).json()
        })



    },

    getallOrders: (req, res) => {
        try {
            bookingHelpers.getAllorders().then((orders) => {
                res.status(200).json(orders)

            })
        }catch(err) {
            res.status(500).json({ error: 'Internal server error' });

        }
},

CancelBooking:async(req,res)=>{
    try{
        bookingHelpers.refundBooking(req.params.orderid).then(()=>{
            adminHelpers.Refund(req.params.hostid, req.params.orderprice).then(()=>{
                res.status(200).json()
        
            })
        })
    
    }
    catch(err){
        res.status(500).send(err);

    }
},
getallDashboard:async(req,res)=>{

const booking = await adminHelpers.totalBookingPerDay()
const nofp = await adminHelpers.totalNumberOfProperty()
const moneyperweek= await adminHelpers.moneyGeneratedPerWeek()

const moneypToday= await adminHelpers.calculateTodayAmount()
const totalmoney = await adminHelpers.getTotalBookingAmount()
const totalperMonth =await adminHelpers.generateMonthlyReports()


const data ={}   
data.totalBookingPerDay = booking
data.moneyGeneratedPerWeek = moneyperweek
data.totalNumberOfProperty=nofp
data.TodayAmount= moneypToday
data.totalAmount = totalmoney
data.totalperMonth = totalperMonth

res.status(200).json(data)
 
},
deleteProperty : (req, res, next) => {
    const id = req.params.id;

    adminHelpers.removeProperty(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to remove property' });
        });
}

        
};

module.exports = adminController;
