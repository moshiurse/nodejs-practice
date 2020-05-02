const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://root:12345@moshiurscluster-mkbxp.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err; 
    }); 
};

const getDb = () => {
    if(_db){
        return _db;
    }else{
        throw "No Database found";
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
