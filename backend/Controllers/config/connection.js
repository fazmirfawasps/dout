const { MongoClient } = require('mongodb');
const state={
    db:null
}


const uri = 'mongodb+srv://fazmirfawas:fazmirfawasps%405354@cluster0.peuhz9z.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
 module.exports. connectToMongo =async function (done) {
  try {
    await client.connect();
    const db = client.db('heavyvehicle')
   
    state.db =db
    done()
  } catch (err) {
    console.error(err);
  }
}
module.exports.get=function(){
    return state.db
}


