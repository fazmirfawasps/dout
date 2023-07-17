const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');

module.exports={
    addConversation: async (data) => {
      const conversation = [
            new ObjectId(data.senderid),
            new ObjectId(data.receiverid),
          ]
    return new Promise(async (resolve, reject) => {
      const findIfExsist = await db.get().collection('Converstaions').findOne({conversation:{$all:[new ObjectId(data.senderid),new ObjectId(data.receiverid)]}})
            if (!findIfExsist) {
            db.get().collection('Converstaions').insertOne({conversation})
            }
            else{
              
            }
           
            resolve()
         
    })


    },
    
  getAllConversation:  ({userid}) => {

    return new Promise(async(resolve, reject) => {
        try {
          const result = await db.get().collection('Converstaions').aggregate([
              {
                $match: {
                  conversation: {
                    $in: [new ObjectId(userid)],
                  },
                },
              },
              { $unwind: "$conversation" },
              {
                $match: {
                  conversation: {
                    $ne: new ObjectId(userid),
                  },
                },
              },
              {
                $lookup: {
                  from: "user",
                  localField: "conversation",
                  foreignField: "_id",
                  as: "receiverDetails",
                },
              },
              {
                $addFields: {
                  receiverDetails: { $arrayElemAt: ["$receiverDetails", 0] },
                },
              },
              {
                $addFields: {
                  receiverid: "$conversation",
                  receiverName: "$receiverDetails.FullName",
                  conversationid:'$_id'
                },
              },
              {
                $project: {
                  receiverid: 1,
                  receiverName: 1,
                  conversationid: 1,
                  _id:0
                },
              },
            ]).toArray()
            resolve(result)
          } catch (err) {
          }
        
    })
}

}