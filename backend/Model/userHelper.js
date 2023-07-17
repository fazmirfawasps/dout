const { response } = require('../app');
const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');
module.exports = {
    addUser: (user) => {


        return new Promise(async (resolve, reject) => {
            const isUser = await db.get().collection('user').find({ Email: user.email }).toArray()
            if (isUser.length != 0) {
                const res = {
                    details: isUser,
                    data: true
                }
                resolve(res)
            }
            else {
                db.get().collection('user').insertOne({
                    Email: user.email,
                    block: false
                }).then(async(response) => {
                    const isUser = await db.get().collection('user').find({ Email: user.email }).toArray()
                    if (isUser.length != 0) {
                        const res = {
                            details: isUser,
                            data: false
                        }
                        resolve(res)
                    }
                })
            }

        })


    }
    ,
    editUser: (user) => {
        return new Promise(async (resolve, reject) => {
            const isNumexisted = await db.get().collection('user').find({ MobileNumber: user.MobileNumber }).toArray()
            if (isNumexisted.length != 0) {

                resolve(true)
            }
            else {
                db.get().collection('user').updateOne({ Email: user.email }, { $set: { FullName: user.FullName, MobileNumber: user.MobileNumber } })
                resolve(false)

            }


        })
    }
    ,
    checkNum: ({ MobileNumber }) => {
        return new Promise(async (resolve, reject) => {
            const isNumexisted = await db.get().collection('user').find({ MobileNumber: MobileNumber }).toArray()
            if (isNumexisted.length != 0) {

                resolve(isNumexisted)
            }
            else {
                resolve(false)

            }

        })


    },
    getauser: (id) => {
        return new Promise(async (resolve, reject) => {
            const user = await db.get().collection('user').find({ _id: new ObjectId(id) }).toArray()
            resolve(user)

        })

    },
    GetAllProperty: () => {

        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList')
                .find()
                .toArray()
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        })

    },

    removeProperty: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList').deleteOne({ _id: new ObjectId(id) }).then((respone) => {
                    const filter = {
                        wishlist: id
                    }

                    const update = {
                        $pull: { wishlist: id }
                    };
                    db.get().collection('WishList').updateMany(filter, update).then(() => {
                        resolve(respone)

                    })
                })
        }
        )
    }
    , addUnavailableDates: (id, dates) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList').updateOne(
                    { _id: new ObjectId(id) },
                    { $addToSet: { NotAvailable: { $each: dates } } }
                ).then(() => {
                })
        }
        )
    }
    , editProfile: (id, data) => {

        return new Promise((resolve, reject) => {
            db.get().collection('user').updateOne({ _id: new ObjectId(id) }, { $set: data })
            resolve(false)
        })
    }

}