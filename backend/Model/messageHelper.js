const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');
module.exports = {

    addMessages: async (body) => {

        const message = {
            conversationid: body.conversationid,
            senderid: body.senderid,
            text: body.text,
            createdAt: body.createdAt
        };
        return new Promise((resolve, reject) => {
            try {
                db.get().collection('Messages').insertOne(message)
                resolve(message)
            } catch (err) {
            }

        })
    },
    getMessages: (id) => {
        return new Promise(async (resolve, reject) => {
            const messages = await db.get().collection('Messages').find({
                conversationid: id,

            }).toArray()
            resolve(messages)
        })
    }
}