const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');


module.exports={

addWishlist:(body)=>{


    return new Promise((resolve, reject) => {
        db.get().collection('WishList').updateOne(
            { userid: body.userid },
            { $addToSet: { wishlist: body.item } },
            { upsert: true }).then(()=>{
                resolve()
            })
    })
},
removeWishlist:(body)=>{
    return new Promise((resolve, reject) => {
        db.get().collection('WishList').updateOne(
            { userid: body.userid },
            { $pull: { wishlist: body.wishlistid } })
            .then(()=>{
                resolve()
            })
    })
},
getWishlist:(id)=>{

    return new Promise(async(resolve, reject) => {
      const result = await   db.get().collection('WishList').aggregate([
            { $match: { userid: id } },
            { $unwind: "$wishlist" },
            {
              $lookup: {
                from: "PropertyList",
                let: { wishlistId: { $toObjectId: "$wishlist" } },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$wishlistId"] } } },
                ],
                as: "property",
              },
            },
            {
              $addFields: {
                property: { $arrayElemAt: ["$property", 0] },
              }
            }
          ]).toArray();

          const whishlistitem = result.map((item) => item.property);
          resolve(whishlistitem)
    })
},


}