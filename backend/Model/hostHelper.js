const db = require('../Controllers/config/connection')
const { ObjectId } = require('mongodb');
module.exports = {

  Addproperty: (Data) => {

    return new Promise((resolve, reject) => {
      db.get().collection('PropertyList').insertOne(Data).then((response) => {
        resolve()
      })
    })



  },

  GethostProperty: ({ hostid }) => {

    const id = hostid

    return new Promise((resolve, reject) => {
      db.get()
        .collection('PropertyList')
        .find({ hostid: id })
        .toArray()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    })

  },

  GetAhostProperty: ({ Propertid }) => {

    return new Promise((resolve, reject) => {
      db.get()
        .collection('PropertyList')
        .find({ _id: new ObjectId(Propertid) })
        .toArray()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    })

  },
  AddHostdetails: (Data) => {

    const hostid =Data.hostid
    return new Promise((resolve, reject) => {
      db.get().collection('HostDetails').insertOne(Data).then((response) => {
      }).then(() => {

        db.get().collection('user').updateOne(
          { _id: new ObjectId(hostid) },
          { $set: { Hostapplied: true } }
        ).then((response) => {
          resolve()
        })
      })
    })
  },

  editProperty:(id,data)=>{

    return new Promise((resolve, reject) => {
      db.get().collection('PropertyList').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      ).then((response) => {
        resolve()
      })
    })
  }


}