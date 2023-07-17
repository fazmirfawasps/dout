const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');


module.exports = {

  addBooking: (data) => {


    return new Promise((resolve, reject) => {
      db.get()
        .collection('Booking').insertOne(data).then(() => {

          resolve()

        })
    })


  },

  getOrders: (id) => {
    return new Promise(async (resolve, reject) => {
      const orders = await db.get().collection('Booking').aggregate([
        { $match: { userid: id } },
        {
          $lookup: {
            from: "PropertyList",
            let: { propertyId: { $toObjectId: "$propertyid" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$propertyId"]
                  }
                }
              }
            ],
            as: "Property"
          }
        }, {
          $addFields: {
            Property: { $arrayElemAt: ["$Property", 0] },
          },
        },
        {
          $project: {
            paymentStatus: 1,
            OrderStatus: 1,
            checkin: 1,
            checkOut: 1,
            createdAt: 1,
            propertyName: "$Property.PropertyName",
            address: "$Property.Address",
            totalprice: 1,
            image: "$Property.imageFilenames",
          },
        },
        {
          $addFields: {

            TotalAmount: "$totalprice",
            Checkin: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkin" },
            },
            Checkout: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkOut" },
            },
            PropertyName: "$propertyName",
            PropertyAddress: "$address",
            Image: { $arrayElemAt: ["$image", 0] },
            Action: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$OrderStatus", "Booking Confirmed"] },
                    { $eq: ["$OrderStatus", "Booking pending"] },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            OrderStatus: 1,
            TotalAmount: 1,
            Checkin: 1,
            Checkout: 1,
            createdAt:1,
            PropertyName: 1,
            PropertyAddress: 1,
            Image: 1,
            Action: 1,
          },
        },
        { $sort: { createdAt: -1 } }
      ]).toArray();
      resolve(orders)
    })




  },
  cancelBooking: (id) => {
    return new Promise((resolve, reject) => {

      db.get().collection('Booking').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            OrderStatus: "Booking Cancelled",
          },
        }
      )
      resolve()

    })
  },
  refundBooking: (id) => {
    return new Promise((resolve, reject) => {

      db.get().collection('Booking').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            OrderStatus: "Refunded",
          },
        }
      )
      resolve()

    })
  },


  getAllorders: () => {
    return new Promise(async (resolve, reject) => {
      const  orders = await db.get().collection('Booking').aggregate([
        { $match: {  } },
        {
          $lookup: {
            from: "PropertyList",
            let: { propertyId: { $toObjectId: "$propertyid" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$propertyId"]
                  }
                }
              }
            ],
            as: "Property"
          }
        }, {
          $addFields: {
            Property: { $arrayElemAt: ["$Property", 0] },
          },
        },
        {
          $project: {
            guest: 1,
            paymentStatus: 1,
            OrderStatus: 1,
            checkin: 1,
            checkOut: 1,
            hostid:1,
            createdAt: 1,
            propertyName: "$Property.PropertyName",
            address: "$Property.Address",
            totalprice: 1,
            image: "$Property.imageFilenames",
          },
        },
        {
          $addFields: {

            TotalAmount: "$totalprice",
            Checkin: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkin" },
            },
            Checkout: {
              $dateToString: { format: "%d-%m-%Y", date: "$checkOut" },
            },
            PropertyName: "$propertyName",
            PropertyAddress: "$address",
            Image: { $arrayElemAt: ["$image", 0] },
            Action: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$OrderStatus", "Booking Confirmed"] },
                    { $eq: ["$OrderStatus", "Booking pending"] },
                  ],
                },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            OrderStatus: 1,
            TotalAmount: 1,
            Checkin: 1,
            Checkout: 1,
            PropertyName: 1,
            createdAt:1,
            PropertyAddress: 1,
            Image: 1,
            Action: 1,
            hostid:1
          },
        },
        { $sort: { createdAt: -1 } }
      ]).toArray();
      resolve(orders)
    })


  }
}