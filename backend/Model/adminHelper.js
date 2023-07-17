const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
    addCategory: (cat, img) => {

        return new Promise((resolve, reject) => {
            db.get().collection('Category').insertOne({ Category: cat, image: img }).then((response) => {
                resolve(response)
            })
        })
    },
    findAllCategory: () => {
        return new Promise(async (resolve, reject) => {
            const category = db.get().collection('Category').find().toArray()
            resolve(category)
        })
    },
    deleteAcategory: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('Category').deleteOne({ _id: new ObjectId(id) }).then((response) => {
                resolve()
            })

        })
    },
    Editcategory: (id, cat) => {
        return new Promise((resolve, reject) => {
            db.get().collection('Category').updateOne({ _id: new ObjectId(id) },
                { $set: cat }).then((response) => {
                    resolve(response)
                }).catch((err) => {
                    reject(err)
                })
        })
    },
    getAlluser: () => {
        return new Promise(async (resolve, reject) => {
            const user = db.get().collection('user').find().project({
                _id: 1,
                FullName: 1,
                Email: 1,
                MobileNumber: 1,
                block: 1


            }).toArray()
            resolve(user)

        })
    },
    blockUser: (action, id) => {
        const a = JSON.parse(action)
        return new Promise((resolve, reject) => {
            db.get().collection('user').updateOne(
                { _id: new ObjectId(id) },
                { $set: { block: !a } }
            ).then((response) => {
                resolve()
            })


        })

    },
    Refund : (id,totalprice)=>{
            
        const numericTotalPrice = parseInt(totalprice);
        return new Promise((resolve, reject) => {
            db.get().collection('user').updateOne(
                { _id: new ObjectId (id) },
                { $inc: { Wallet: numericTotalPrice } }
              
            ).then((response) => {
                resolve()
            })


        })
    },
    GetAllProperty: () => {

        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList')
                .find()
                .project({
                    _id: 1, hostid: 1,


                    PropertyName: 1,

                    Address: 1,

                    Price: 1,

                    Available: 1,

                    VehicleType: 1,
                    // imageFilenames: 1,
                    Activate: 1
                })
                .toArray()

                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        })

    },
    GetAllHostdetail: () => {

        return new Promise((resolve, reject) => {
            db.get()
                .collection('HostDetails')
                .find()
                .project({
                    _id: 1,
                    hostid: 1,

                    FullName: 1,
                    Vrified: 1


                })
                .toArray()

                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        })

    },
    GetAhostDetail: ({ id }) => {



        return new Promise((resolve, reject) => {
            db.get()
                .collection('HostDetails')
                .find({ _id: new ObjectId(id) })
                .toArray()
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        })

    },
    verifyHost: ({ id, hostid }) => {
        return new Promise((resolve, reject) => {
            db.get().collection('HostDetails').updateOne(
                { _id: new ObjectId(id) },
                { $set: { Verified: true } }
            ).then((response) => {
                db.get().collection('user').updateOne(
                    { _id: new ObjectId(hostid) },
                    { $set: { Verified: true } }
                ).then((response) => {
                    resolve()
                })
            })


        })




    },
    totalBookingPerDay: () => {

        return new Promise(async (resolve, reject) => {
            const result = await db.get().collection('Booking').aggregate([
                { $match: {} },
                {
                    $addFields: {
                        CreatedAt: {
                            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
                        },
                    },
                },
                {
                    $group: {
                        _id: "$CreatedAt",
                        total: { $count: {} },
                        alldocument: { $push: "$$ROOT" },
                    },
                },
                { $addFields: { date: "$alldocument.createdAt" } },
                {
                    $project: { date: { $arrayElemAt: ["$date", 0] }, _id: 1, total: 1 },
                },
                { $sort: { _id: 1 } },
                { $limit: 4 },
            ]).toArray()
            if(result.length==0){

                resolve(0)
            }
            else{
                

                resolve( result)

            }
        })
    },

    totalNumberOfProperty: () => {
        return new Promise(async (resolve, reject) => {
            const result = await db.get().collection('PropertyList').countDocuments({})
            if(result.length==0){

                resolve(0)
            }
            else{
                

                resolve(result)

            }

        })

    },
    moneyGeneratedPerWeek: () => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date(
            currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        return new Promise(async (resolve, reject) => {
            const result = await db.get().collection('Booking').aggregate([
                { $match: { createdAt: { $gte: sevenDaysAgo, $lte: currentDate } } },
                { $group: { _id: 0, weeklyAmount: { $sum:  { $toInt: "$totalprice" } } } },
                { $project: { weeklyAmount: 1, _id: 0 } },
            ]).toArray()
            if(result.length==0){

                resolve(0)
            }
            else{
                

                resolve(result[0].weeklyAmount)

            }
        })
    }
    ,
    calculateTodayAmount: () => {
        const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);
        return new Promise(async (resolve, reject) => {
            try {
                const result = await db.get()
                    .collection('Booking')
                    .aggregate([
                        {
                            $match: {
                                createdAt: {
                                    $lte: currentDate, // Match documents with createdAt greater than or equal to the current date
                                    $gt: new Date(currentDate.getTime() -  24 * 60 * 60 * 1000) // Match documents with createdAt less than the next day
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalAmount: { $sum: { $toInt: "$totalprice" } } // Convert the totalprice field to an integer and calculate the sum
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalAmount: 1
                            }
                        }
                    ])
                    .toArray()
                    
                    if(result.length ==0){
                        resolve(0);

                    }
                    else{
                        resolve(result[0].totalAmount)
                    }


        
            } catch (error) {
                reject(error);
            }
        })
    },
    getTotalBookingAmount :() => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await db.get()
              .collection('Booking')
              .aggregate([
                {
                  $group: {
                    _id: null,
                    totalAmount: { $sum: { $toInt: "$totalprice" } }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalAmount: 1
                  }
                }
              ])
              .toArray();
      
            if(result.length==0){

                resolve(0)
            }
            else{
                

                resolve(result[0].totalAmount)

            }
          } catch (error) {
            reject(error);
          }
        });


},
removeProperty: (id) => {
    return new Promise((resolve, reject) => {
        db.get()
            .collection('PropertyList').deleteOne({ _id: new ObjectId(id) }).then((respone) => {
                const filter = {
                    wishlist: id
                  }
              
                  const update = {
                    $pull: { wishlist: id}
                  };
                db.get().collection('WishList').updateMany(filter, update).then(()=>{
                    resolve(respone)

                })

            })
    }
    )
},
generateMonthlyReports : () => {
    return Promise.all(months.map((month, index) => {
      const startDate = new Date(`2023-${index + 1}-01`);
      const endDate = new Date(`2023-${index + 2}-01`);
  
      return new Promise((resolve) => {
        db.get().collection('Booking').aggregate([
          { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
          { $group: { _id: null, count: { $sum: 1 } } },
        ]).toArray()
          .then((result) => {
            const totalBookings = result.length > 0 ? result[0].count : 0;
            resolve({ month, totalBookings });
          })
          .catch((error) => {
            resolve({ month, error });
          });
      });
    }));
  }
}