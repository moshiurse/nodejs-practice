const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email){
        this.username = username;
        this.email = email;
    }

    save(){
        const db = getDb();
        db.collection('users').insertOne(this);
    }

    static findbyId(userId){
        const db = getDb();
        d.collection('users').find({_id: new ObjectId(userId)})
    }

}

module.exports = User;