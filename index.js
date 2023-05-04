
const mongodb = require('mongodb-legacy');

const MongoClient = mongodb.MongoClient;

let db;

MongoClient.connect('mongodb://127.0.0.1:27017',(err, client)=>{
    if(err !== undefined){
        console.log(err)
    } else {
        db = client.db('cesta')
    }
})

